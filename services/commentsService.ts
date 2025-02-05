import prisma from "../prisma";
import createHttpError from "http-errors";

export const createComment = async (data: {
  userIdProp: number;
  taskIdProp: number;
  content: string;
}) => {
  try {
    const comment = prisma.comment.create({
      data: {
        content: data.content,
        userId: data.userIdProp,
        taskId: data.taskIdProp,
      },
    });

    return comment;
  } catch (error) {
    throw createHttpError(500, "Failed to create comment");
  }
};

export const deleteComment = async (id: number) => {
  try {
    const deletedComment = prisma.comment.delete({
      where: {
        id: id,
      },
    });

    return deletedComment;
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};

export const createReply = async (data: {
  commentId: number;
  userIdProp: number;
  content: string;
}) => {
  try {
    const reply = await prisma.commentReply.create({
      data: {
        commentId: data.commentId,
        userId: data.userIdProp,
        content: data.content,
      },
    });

    return reply;
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};

export const deleteReply = async (id: number) => {
  try {
    const deletedReply = await prisma.commentReply.delete({
      where: {
        id: id,
      },
    });

    return deletedReply;
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};

export const getCommentsFromTask = async (idProp: number) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        taskId: idProp,
      },
      include: {
        user: true,
        replies: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};

export const getRepliesFromComment = async (idProp: number) => {
  try {
    const replies = await prisma.commentReply.findMany({
      where: {
        commentId: idProp,
      },
      include: {
        user: true,
      },
    });

    return replies;
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};
