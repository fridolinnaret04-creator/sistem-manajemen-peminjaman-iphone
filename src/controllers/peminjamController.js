import * as peminjamModel from "../models/peminjamModel.js";

const serializeBigInt = (data) => {
  return JSON.parse(
    JSON.stringify(
      data,
      (_, value) =>
        typeof value === "bigint"
          ? value.toString()
          : value
    )
  );
};

export default {
  getAll: async (req, res, next) => {
    try {
      const peminjam = await peminjamModel.getAll();

      res.json({
        data: serializeBigInt(peminjam),
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const peminjam = await peminjamModel.getById(req.params.id);

      if (!peminjam) {
        return res.status(404).json({
          error: "Peminjam tidak ditemukan",
        });
      }

      res.json({
        data: serializeBigInt(peminjam),
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const peminjam = await peminjamModel.createPeminjam(req.body);

      res.status(201).json({
        message: "Peminjam berhasil ditambahkan",
        data: serializeBigInt(peminjam),
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const existing = await peminjamModel.getById(req.params.id);

      if (!existing) {
        return res.status(404).json({
          error: "Peminjam tidak ditemukan",
        });
      }

      const peminjam = await peminjamModel.updatePeminjam(
        req.params.id,
        req.body
      );

      res.json({
        message: "Peminjam berhasil diperbarui",
        data: serializeBigInt(peminjam),
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const existing = await peminjamModel.getById(req.params.id);

      if (!existing) {
        return res.status(404).json({
          error: "Peminjam tidak ditemukan",
        });
      }

      await peminjamModel.deletePeminjam(req.params.id);

      res.json({
        message: "Peminjam berhasil dihapus",
      });
    } catch (error) {
      next(error);
    }
  },
};