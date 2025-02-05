import { Request, Response } from "express";
import * as commentsService from "../services/commentsService";

export const createComment = async (req: Request, res: Response) => {
  const { userIdProp, taskIdProp, content } = req.body;

  const comment = await commentsService.createComment({
    userIdProp,
    taskIdProp,
    content,
  });

  res.status(201).json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedComment = await commentsService.deleteComment(Number(id));

  res.status(201).json(deletedComment);
};

export const createReply = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { userIdProp, content } = req.body;

  try {
    const reply = await commentsService.createReply({
      commentId: Number(commentId),
      userIdProp: Number(userIdProp),
      content,
    });

    res.status(201).json(reply);
  } catch (error) {
    console.error("Error in createReply route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteReply = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedReply = await commentsService.deleteReply(Number(id));
  res.status(201).json(deletedReply);
};

export const getCommentsFromTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const comments = await commentsService.getCommentsFromTask(Number(id));

  res.status(201).json(comments);
};

export const getRepliesFromComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const replies = await commentsService.getRepliesFromComment(Number(id));

  res.status(201).json(replies);
};
