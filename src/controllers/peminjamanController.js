import * as iphoneModel from "../models/iphoneModel.js";
import * as peminjamModel from "../models/peminjamModel.js";
import * as peminjamanModel from "../models/peminjamanModel.js";

export default {
  getAll: async (req, res, next) => {
    try {
      const peminjaman = await peminjamanModel.getAll();
      res.json({ data: peminjaman });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const peminjaman = await peminjamanModel.getById(req.params.id);
      if (!peminjaman) {
        return res.status(404).json({ error: "Peminjaman tidak ditemukan" });
      }
      res.json({ data: peminjaman });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { peminjamId, iphoneId, tanggalPinjam, tanggalKembali, keterangan } = req.body;

      const iphone = await iphoneModel.getById(iphoneId);
      if (!iphone) {
        return res.status(404).json({ error: "iPhone tidak ditemukan" });
      }
      if (iphone.stok <= 0) {
        return res.status(400).json({ error: "Stok iPhone kosong, tidak dapat melakukan peminjaman" });
      }

      const peminjam = await peminjamModel.getById(peminjamId);
      if (!peminjam) {
        return res.status(404).json({ error: "Peminjam tidak ditemukan" });
      }

      const newStock = iphone.stok - 1;
      await iphoneModel.updateIphone(iphoneId, {
        stok: newStock,
        status: newStock <= 0 ? "Dipinjam" : "Tersedia",
      });

      const peminjaman = await peminjamanModel.createPeminjaman({
        peminjamId: Number(peminjamId),
        iphoneId: Number(iphoneId),
        tanggalPinjam: new Date(tanggalPinjam),
        tanggalKembali: tanggalKembali ? new Date(tanggalKembali) : null,
        keterangan,
        status: "Dipinjam",
      });

      res.status(201).json({ message: "Peminjaman berhasil dibuat", data: peminjaman });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      if (req.body.peminjamId || req.body.iphoneId) {
        return res.status(400).json({ error: "Tidak dapat mengubah peminjam atau iPhone pada peminjaman" });
      }

      const existing = await peminjamanModel.getById(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: "Peminjaman tidak ditemukan" });
      }

      const data = {};
      if (req.body.tanggalPinjam) data.tanggalPinjam = new Date(req.body.tanggalPinjam);
      if (req.body.tanggalKembali) data.tanggalKembali = new Date(req.body.tanggalKembali);
      if (req.body.status) data.status = req.body.status;
      if (req.body.keterangan !== undefined) data.keterangan = req.body.keterangan;

      const peminjaman = await peminjamanModel.updatePeminjaman(req.params.id, data);
      res.json({ message: "Peminjaman berhasil diperbarui", data: peminjaman });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const existing = await peminjamanModel.getById(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: "Peminjaman tidak ditemukan" });
      }
      await peminjamanModel.deletePeminjaman(req.params.id);
      res.json({ message: "Peminjaman berhasil dihapus" });
    } catch (error) {
      next(error);
    }
  },

  returnPhone: async (req, res, next) => {
    try {
      const peminjaman = await peminjamanModel.getById(req.params.id);
      if (!peminjaman) {
        return res.status(404).json({ error: "Peminjaman tidak ditemukan" });
      }
      if (peminjaman.status === "Dikembalikan") {
        return res.status(400).json({ error: "iPhone sudah dikembalikan" });
      }

      const iphone = await iphoneModel.getById(peminjaman.iphoneId);
      if (!iphone) {
        return res.status(404).json({ error: "iPhone terkait tidak ditemukan" });
      }

      const updatedStock = iphone.stok + 1;
      await iphoneModel.updateIphone(peminjaman.iphoneId, {
        stok: updatedStock,
        status: "Tersedia",
      });

      const updatedPeminjaman = await peminjamanModel.updatePeminjaman(req.params.id, {
        status: "Dikembalikan",
        tanggalKembali: new Date(),
      });

      res.json({ message: "Pengembalian berhasil diproses", data: updatedPeminjaman });
    } catch (error) {
      next(error);
    }
  },
};
