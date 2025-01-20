import express from "express";

const app = express();

// Middleware to parse JSON requests

// Register routes

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
