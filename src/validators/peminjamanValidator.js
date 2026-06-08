import { body } from "express-validator";
import validate from "./validator.js";

export const createPeminjaman = [
  body("peminjamId").isInt({ min: 1 }).withMessage("PeminjamId wajib diisi dan berupa angka"),
  body("iphoneId").isInt({ min: 1 }).withMessage("IphoneId wajib diisi dan berupa angka"),
  body("tanggalPinjam").isISO8601().withMessage("Tanggal pinjam wajib berupa format tanggal ISO8601"),
  body("tanggalKembali").optional().isISO8601().withMessage("Tanggal kembali wajib berupa format tanggal ISO8601"),
  body("keterangan").optional().isString(),
  validate,
];

export const updatePeminjaman = [
  body("tanggalPinjam").optional().isISO8601().withMessage("Tanggal pinjam wajib berupa format tanggal ISO8601"),
  body("tanggalKembali").optional().isISO8601().withMessage("Tanggal kembali wajib berupa format tanggal ISO8601"),
  body("status").optional().isString(),
  body("keterangan").optional().isString(),
  validate,
];
