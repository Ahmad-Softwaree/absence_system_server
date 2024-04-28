import express from "express";
import { body } from "express-validator";
import {
  addEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../api/employee.js";
import { checkBody } from "../middleware/validation/validation.js";
import { authMiddleware } from "../middleware/auth/auth.js";

const employeeApp = express.Router();

employeeApp.get("/", authMiddleware, getEmployees);
employeeApp.get("/:id", authMiddleware, getEmployee);
employeeApp.post(
  "/",
  authMiddleware,
  body("name").notEmpty(),
  body("address").notEmpty(),
  body("age").notEmpty(),
  body("gender").notEmpty(),
  body("salary").notEmpty(),
  checkBody,
  addEmployee
);
employeeApp.put(
  "/:id",
  authMiddleware,
  body("name").notEmpty(),
  body("address").notEmpty(),
  body("age").notEmpty(),
  body("gender").notEmpty(),
  body("salary").notEmpty(),
  checkBody,
  updateEmployee
);
employeeApp.delete("/:id", authMiddleware, deleteEmployee);

export default employeeApp;
