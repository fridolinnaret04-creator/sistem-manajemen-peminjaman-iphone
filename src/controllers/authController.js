import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userModel from "../models/userModel.js";

const jwtSecret = process.env.JWT_SECRET || "secret123";
const jwtExpiry = "8h";

const authController = {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await userModel.findByEmail(email);

      if (existingUser) {
        return res.status(400).json({
          error: "Email sudah terdaftar",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = await userModel.createUser({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "Registrasi berhasil",
        data: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findByEmail(email);

      if (!user) {
        return res.status(401).json({
          error: "Email atau password salah",
        });
      }

      const validPassword = bcrypt.compareSync(
        password,
        user.password,
      );

      if (!validPassword) {
        return res.status(401).json({
          error: "Email atau password salah",
        });
      }

      const token = jwt.sign(
        {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
        jwtSecret,
        {
          expiresIn: jwtExpiry,
        },
      );

      return res.status(200).json({
        message: "Login berhasil",
        token,
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res) {
    return res.status(200).json({
      message: "Logout berhasil",
    });
  },

  async profile(req, res, next) {
    try {
      const user = await userModel.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          error: "Pengguna tidak ditemukan",
        });
      }

      return res.status(200).json({
        data: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;