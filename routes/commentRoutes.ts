import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createComment,
  deleteComment,
  createReply,
  deleteReply,
} from "../controllers/commentController";

const router = express.Router();

router.post("/createcomment", authMiddleware, asyncHandler(createComment));
router.delete(
  "/deletecomment/:id",
  authMiddleware,
  asyncHandler(deleteComment)
);
router.post(
  "/createreply/:commentId",
  authMiddleware,
  asyncHandler(createReply)
);
router.delete("/deletereply/:id", authMiddleware, asyncHandler(deleteReply));

export default router;
