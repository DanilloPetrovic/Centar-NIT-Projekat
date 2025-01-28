import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createProject,
  updateProject,
  deleteProject,
  updateParticipent,
  getAllMyProjects,
  getProjectsThatCreatedByMe,
  projectDone,
} from "../controllers/projectController";
import { projectSchema } from "../models/validators/projectValidator";
import { validate } from "../middlewares/validate";

const router = express.Router();

router.post(
  "/createproject",
  authMiddleware,
  validate(projectSchema),
  asyncHandler(createProject)
);

router.post(
  "/updateproject/:id",
  authMiddleware,
  validate(projectSchema),
  asyncHandler(updateProject)
);

router.post("/deleteproject/:id", authMiddleware, asyncHandler(deleteProject));

router.post(
  "/updateparticipants/:id",
  authMiddleware,
  asyncHandler(updateParticipent)
);

router.get(
  "/getallproject/:id",
  authMiddleware,
  asyncHandler(getAllMyProjects)
);

router.get(
  "/getprojectthatcreatedbyme/:id",
  authMiddleware,
  asyncHandler(getProjectsThatCreatedByMe)
);

router.post("/projectdone/:id", authMiddleware, asyncHandler(projectDone));

export default router;
