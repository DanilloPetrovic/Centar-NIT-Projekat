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
  getAllProjectsNoFilter,
  getSingleProject,
  getProjectTasks,
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
  "/getallprojectnofilter/:id",
  authMiddleware,
  asyncHandler(getAllProjectsNoFilter)
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

router.get("/getproject/:id", authMiddleware, asyncHandler(getSingleProject));

router.post("/projectdone/:id", authMiddleware, asyncHandler(projectDone));

router.get("/gettasks/:id", authMiddleware, asyncHandler(getProjectTasks));

export default router;
