import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createComment,
  deleteComment,
  createReply,
  deleteReply,
  getCommentsFromTask,
  getRepliesFromComment,
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
router.get(
  "/getcomments/:id",
  authMiddleware,
  asyncHandler(getCommentsFromTask)
);
router.get(
  "/getreplies/:id",
  authMiddleware,
  asyncHandler(getRepliesFromComment)
);

export default router;
