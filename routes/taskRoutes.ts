import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authMiddleware from "../middlewares/authMiddleware";
import {
  completeTask,
  createTask,
  deleteTask,
  getAllTasks,
  getCompletedTasks,
  getIncompletedTasks,
  getNewestTasks,
  getTasksByClosestDueDate,
  getTasksByPriority,
  incompleteTask,
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
router.delete("/deletetask/:id", authMiddleware, asyncHandler(deleteTask));
router.post("/taskcomplete", authMiddleware, asyncHandler(completeTask));
router.post("/taskincomplete", authMiddleware, asyncHandler(incompleteTask));
router.get("/getalltasks", authMiddleware, asyncHandler(getAllTasks));
router.get(
  "/getcompletedtasks",
  authMiddleware,
  asyncHandler(getCompletedTasks)
);
router.get(
  "/getincompletedtasks",
  authMiddleware,
  asyncHandler(getIncompletedTasks)
);
router.get("/getnewesttasks", authMiddleware, asyncHandler(getNewestTasks));
router.get(
  "/gettasksbypriority/:priority",
  authMiddleware,
  asyncHandler(getTasksByPriority)
);
router.get(
  "/gettasksbyclosestduedate",
  authMiddleware,
  asyncHandler(getTasksByClosestDueDate)
);

export default router;
