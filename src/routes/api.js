import express from "express";
import authController from "../controllers/authController.js";
import iphoneController from "../controllers/iphoneController.js";
import peminjamController from "../controllers/peminjamController.js";
import peminjamanController from "../controllers/peminjamanController.js";
import dashboardController from "../controllers/dashboardController.js";
import jwtAuth from "../middleware/jwtAuth.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  registerRules,
  loginRules,
} from "../validators/authValidator.js";
import {
  createIphone,
  updateIphone,
} from "../validators/iphoneValidator.js";
import {
  createPeminjam,
  updatePeminjam,
} from "../validators/peminjamValidator.js";
import {
  createPeminjaman,
  updatePeminjaman,
} from "../validators/peminjamanValidator.js";

const router = express.Router();

router.post("/auth/register", registerRules, authController.register);
router.post("/auth/login", loginRules, authController.login);
router.post("/auth/logout", jwtAuth, authController.logout);
router.get("/auth/profile", jwtAuth, authController.profile);

router.get("/iphones", jwtAuth, iphoneController.getAll);
router.get("/iphones/:id", jwtAuth, iphoneController.getById);
router.post(
  "/iphones",
  jwtAuth,
  roleMiddleware(["ADMIN"]),
  createIphone,
  iphoneController.create,
);
router.put(
  "/iphones/:id",
  jwtAuth,
  roleMiddleware(["ADMIN"]),
  updateIphone,
  iphoneController.update,
);
router.delete(
  "/iphones/:id",
  jwtAuth,
  roleMiddleware(["ADMIN"]),
  iphoneController.destroy,
);

router.get("/peminjam", jwtAuth, peminjamController.getAll);
router.get("/peminjam/:id", jwtAuth, peminjamController.getById);
router.post("/peminjam", jwtAuth, createPeminjam, peminjamController.create);
router.put("/peminjam/:id", jwtAuth, updatePeminjam, peminjamController.update);
router.delete("/peminjam/:id", jwtAuth, peminjamController.destroy);

router.get("/peminjaman", jwtAuth, peminjamanController.getAll);
router.get("/peminjaman/:id", jwtAuth, peminjamanController.getById);
router.post(
  "/peminjaman",
  jwtAuth,
  createPeminjaman,
  peminjamanController.create,
);
router.put(
  "/peminjaman/:id",
  jwtAuth,
  updatePeminjaman,
  peminjamanController.update,
);
router.delete("/peminjaman/:id", jwtAuth, peminjamanController.destroy);
router.put(
  "/peminjaman/:id/pengembalian",
  jwtAuth,
  peminjamanController.returnPhone,
);

router.get("/dashboard", jwtAuth, dashboardController.getDashboard);

export default router;
