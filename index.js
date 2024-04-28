import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import authApp from "./routes/auth.js";
import employeeApp from "./routes/employee.js";

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

app.listen(PORT, () => {
  console.log("Server Start...");
});
