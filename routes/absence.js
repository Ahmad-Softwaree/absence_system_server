import express from "express";
import {
  checkIn,
  deleteAbsence,
  getAbsence,
  getAbsences,
  checkOut,
  getAbsencesOfEmployee,
  checkCheckIn,
  checkCheckOut,
} from "../api/absence.js";
import { authMiddleware } from "../middleware/auth/auth.js";

const absenceApp = express.Router();

absenceApp.get("/", authMiddleware, getAbsences);

absenceApp.get("/employee/:e_log_id", authMiddleware, getAbsencesOfEmployee);

absenceApp.get("/employee/check/in/:e_log_id", authMiddleware, checkCheckIn);
absenceApp.get("/employee/check/out/:e_log_id", authMiddleware, checkCheckOut);

absenceApp.get("/:id", authMiddleware, getAbsence);

absenceApp.post("/in/:e_log_id", authMiddleware, checkIn);
absenceApp.post("/out/:e_log_id", authMiddleware, checkOut);
absenceApp.delete("/:id", authMiddleware, deleteAbsence);

export default absenceApp;
