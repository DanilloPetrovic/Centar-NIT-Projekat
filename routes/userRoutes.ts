import express from "express";
import {
  getUsers,
  getUserById,
  deleteUser,
  register,
  login,
} from "../controllers/UserController";
import { z } from "zod";
import { validate } from "../middlewares/validate";

const router = express.Router();

const UserSchema = z.object({
  email: z.string().email("Not a valid mail"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/register", validate(UserSchema), register);
router.post("/login", login);
router.delete("/:id", deleteUser);

export default router;
