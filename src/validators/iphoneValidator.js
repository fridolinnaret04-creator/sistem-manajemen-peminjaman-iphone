import { body } from "express-validator";
import validate from "./validator.js";

export const createIphone = [
  body("nama_iphone").notEmpty().withMessage("Nama iPhone wajib diisi"),
  body("seri").notEmpty().withMessage("Seri wajib diisi"),
  body("warna").notEmpty().withMessage("Warna wajib diisi"),
  body("kapasitas").notEmpty().withMessage("Kapasitas wajib diisi"),
  body("kondisi").notEmpty().withMessage("Kondisi wajib diisi"),
  body("stok").isInt({ min: 0 }).withMessage("Stok harus berupa angka minimal 0"),
  validate,
];

export const updateIphone = [
  body("nama_iphone").optional().notEmpty().withMessage("Nama iPhone wajib diisi"),
  body("seri").optional().notEmpty().withMessage("Seri wajib diisi"),
  body("warna").optional().notEmpty().withMessage("Warna wajib diisi"),
  body("kapasitas").optional().notEmpty().withMessage("Kapasitas wajib diisi"),
  body("kondisi").optional().notEmpty().withMessage("Kondisi wajib diisi"),
  body("stok").optional().isInt({ min: 0 }).withMessage("Stok harus berupa angka minimal 0"),
  validate,
];
