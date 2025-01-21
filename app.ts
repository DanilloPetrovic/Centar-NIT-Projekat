import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware to parse JSON requests

// Register routes
app.use("/users", userRoutes);

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
