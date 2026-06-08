import { body } from "express-validator";
import validate from "./validator.js";

export const createPeminjam = [
  body("nama").notEmpty().withMessage("Nama wajib diisi"),
  body("nim").notEmpty().withMessage("NIM wajib diisi"),
  body("jurusan").notEmpty().withMessage("Jurusan wajib diisi"),
  body("nomorTelepon").notEmpty().withMessage("Nomor telepon wajib diisi"),
  body("email").isEmail().withMessage("Email tidak valid"),
  validate,
];

export const updatePeminjam = [
  body("nama").optional().notEmpty().withMessage("Nama wajib diisi"),
  body("nim").optional().notEmpty().withMessage("NIM wajib diisi"),
  body("jurusan").optional().notEmpty().withMessage("Jurusan wajib diisi"),
  body("nomorTelepon").optional().notEmpty().withMessage("Nomor telepon wajib diisi"),
  body("email").optional().isEmail().withMessage("Email tidak valid"),
  validate,
];
