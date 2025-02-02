import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import projectRoutes from "./routes/projectRoutes";
import commentRoutes from "./routes/commentRoutes";
import errorHandler from "./middlewares/errorHandler";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API running" });
});

app.use("/users", userRoutes);
app.use("/task", taskRoutes);
app.use("/project", projectRoutes);
app.use("/comment", commentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

export default app;
