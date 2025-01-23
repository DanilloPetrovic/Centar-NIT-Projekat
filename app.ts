import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes";
import authMiddleware from "./middlewares/authMiddleware";
import errorHandler from "./middlewares/errorHandler";
import { AuthenticateRequest } from "./types/AuthenticatedRequest";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API running" });
});

app.get("/protected", authMiddleware, (req: AuthenticateRequest, res) => {
  res.status(200).json({ message: "You are authenticated", user: req.user });
});

// Middleware to parse JSON requests

// Register routes
app.use("/users", userRoutes);

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

export default app;
