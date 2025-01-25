import express from "express";
import { taskSchema } from "../models/validators/taskValidator";
import asyncHandler from "../middlewares/asyncHandler";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/TaskController";
import { taskValidator } from "../middlewares/taskValidate";

const router = express.Router();

router.post(
  "/createtask",
  authMiddleware,
  taskValidator,
  asyncHandler(createTask)
);

router.post(
  "/updatetask",
  authMiddleware,
  taskValidator,
  asyncHandler(updateTask)
);

router.delete("/deletetask", authMiddleware, asyncHandler(deleteTask));

export default router;
