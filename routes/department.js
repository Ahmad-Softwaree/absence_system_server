import express from "express";
import { body } from "express-validator";
import {
  addDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
} from "../api/department.js";
import { checkBody } from "../middleware/validation/validation.js";
import { authMiddleware } from "../middleware/auth/auth.js";

const departmentApp = express.Router();

departmentApp.get("/", authMiddleware, getDepartments);
departmentApp.get("/:id", authMiddleware, getDepartment);
departmentApp.post(
  "/",
  authMiddleware,
  body("name").notEmpty(),
  body("e_log_id").notEmpty(),
  checkBody,
  addDepartment
);
departmentApp.put(
  "/:id",
  authMiddleware,
  body("name").notEmpty(),
  body("e_log_id").notEmpty(),
  checkBody,
  updateDepartment
);
departmentApp.delete("/:id", authMiddleware, deleteDepartment);

export default departmentApp;
