import prisma from "../prisma";
import createHttpError from "http-errors";

export const createTask = async (data: {
  title: string;
  description: string;
  priority: string;
  userId: number;
  projectId?: number;
  dueDate?: string;
}) => {
  try {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        userId: data.userId,
        projectId: data.projectId,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });

    return task;
  } catch (error: any) {
    throw createHttpError(500, `Failed to create task: ${error.message}`);
  }
};

export const deleteTask = async (deleteTaskId: number) => {
  try {
    const deletedTask = await prisma.task.delete({
      where: { id: deleteTaskId },
    });

    return deletedTask;
  } catch (error) {
    throw createHttpError(401, "Failed to delete task");
  }
};

export const updateTask = async (
  taskId: number,
  data: {
    title: string;
    description: string;
    priority: string;
    projectId?: number;
    dueDate?: string;
    isDone?: boolean;
  }
) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        projectId: data.projectId,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        isDone: data.isDone,
      },
    });

    return updatedTask;
  } catch (error) {
    throw createHttpError(401, "Failed to update task");
  }
};
