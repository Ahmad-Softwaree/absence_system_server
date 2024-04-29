import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import authApp from "./routes/auth.js";
import employeeApp from "./routes/employee.js";
import departmentApp from "./routes/department.js";
import absenceApp from "./routes/absence.js";

dotenv.config();

const { PORT } = process.env;
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", authApp);
app.use("/api/employee", employeeApp);
app.use("/api/department", departmentApp);
app.use("/api/absence", absenceApp);

app.listen(PORT, () => {
  console.log("Server Start...");
});
