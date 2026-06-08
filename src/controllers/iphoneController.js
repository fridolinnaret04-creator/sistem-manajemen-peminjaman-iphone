import * as iphoneModel from "../models/iphoneModel.js";

const serializeBigInt = (data) => {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

export default {
  getAll: async (req, res, next) => {
    try {
      const iphones = await iphoneModel.getAll();

      res.json({
        data: serializeBigInt(iphones),
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const iphone = await iphoneModel.getById(req.params.id);

      if (!iphone) {
        return res.status(404).json({
          error: "iPhone tidak ditemukan",
        });
      }

      res.json({
        data: serializeBigInt(iphone),
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { stok } = req.body;

      const status = stok <= 0
        ? "Dipinjam"
        : "Tersedia";

      const iphone = await iphoneModel.createIphone({
        ...req.body,
        status,
      });

      res.status(201).json({
        message: "iPhone berhasil ditambahkan",
        data: serializeBigInt(iphone),
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const existing = await iphoneModel.getById(req.params.id);

      if (!existing) {
        return res.status(404).json({
          error: "iPhone tidak ditemukan",
        });
      }

      const stok =
        req.body.stok !== undefined
          ? Number(req.body.stok)
          : existing.stok;

      const status =
        stok <= 0
          ? "Dipinjam"
          : "Tersedia";

      const iphone = await iphoneModel.updateIphone(
        req.params.id,
        {
          ...req.body,
          stok,
          status,
        }
      );

      res.json({
        message: "iPhone berhasil diperbarui",
        data: serializeBigInt(iphone),
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const existing = await iphoneModel.getById(req.params.id);

      if (!existing) {
        return res.status(404).json({
          error: "iPhone tidak ditemukan",
        });
      }

      await iphoneModel.deleteIphone(req.params.id);

      res.json({
        message: "iPhone berhasil dihapus",
      });
    } catch (error) {
      next(error);
    }
  },
};