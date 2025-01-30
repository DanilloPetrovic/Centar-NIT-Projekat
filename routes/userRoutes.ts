import express from "express";
import { validate } from "../middlewares/validate";
import {
  loginSchema,
  registerSchema,
} from "../models/validators/userValidator";
import asyncHandler from "../middlewares/asyncHandler";
import {
  register,
  login,
  getUserInfoById,
  getAllUsers,
} from "../controllers/UserController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.get("/me", authMiddleware, asyncHandler(getUserInfoById));
router.get("/getallusers/:id", authMiddleware, asyncHandler(getAllUsers));

export default router;
