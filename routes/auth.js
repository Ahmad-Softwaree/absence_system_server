import express from "express";
import { getAuth, login, register, updateProfile } from "../api/auth.js";
import { body } from "express-validator";
import {
  checkBody,
  hashPassword,
  passwordValidation,
} from "../middleware/validation/validation.js";
import { authMiddleware } from "../middleware/auth/auth.js";
const authApp = express.Router();

authApp.get("/auth", authMiddleware, getAuth);
authApp.post(
  "/login",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
  checkBody,
  login
);
authApp.post(
  "/register",
  body("name").notEmpty(),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
  checkBody,
  passwordValidation,
  hashPassword,
  //authMiddleware,
  register
);

authApp.put(
  "/profile",
  body("name").notEmpty(),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
  checkBody,
  passwordValidation,
  hashPassword,
  authMiddleware,
  updateProfile
);
export default authApp;
