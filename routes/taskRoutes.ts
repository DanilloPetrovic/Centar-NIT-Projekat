import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authMiddleware from "../middlewares/authMiddleware";
import {
  completeTask,
  createProjectTask,
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
router.get("/getalltasks/:id", authMiddleware, asyncHandler(getAllTasks));
router.get(
  "/getcompletedtasks/:id",
  authMiddleware,
  asyncHandler(getCompletedTasks)
);
router.get(
  "/getincompletedtasks/:id",
  authMiddleware,
  asyncHandler(getIncompletedTasks)
);
router.get("/getnewesttasks/:id", authMiddleware, asyncHandler(getNewestTasks));
router.get(
  "/gettasksbypriority/:priority/:id",
  authMiddleware,
  asyncHandler(getTasksByPriority)
);
router.get(
  "/gettasksbyclosestduedate/:id",
  authMiddleware,
  asyncHandler(getTasksByClosestDueDate)
);
router.post(
  "/createprojecttask",
  authMiddleware,
  asyncHandler(createProjectTask)
);

export default router;
