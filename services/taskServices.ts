import prisma from "../prisma";
import createHttpError from "http-errors";

export const createTask = async (data: {
  title: string;
  description: string;
  priority: string;
  userId: number;
  dueDate?: string;
}) => {
  try {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        userId: data.userId,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });

    return task;
  } catch (error: any) {
    throw createHttpError(500, `Failed to create task: ${error.message}`);
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

export const isDoneTrue = async (taskId: number) => {
  try {
    const isDoneChange = prisma.task.update({
      where: { id: taskId },
      data: { isDone: true },
    });

    return isDoneChange;
  } catch (error) {
    throw createHttpError(401, "Failed to update task");
  }
};

export const isDoneFalse = async (taskId: number) => {
  try {
    const isDoneChange = prisma.task.update({
      where: { id: taskId },
      data: { isDone: false },
    });

    return isDoneChange;
  } catch (error) {
    throw createHttpError(401, "Failed to update task");
  }
};

export const getAllTasks = async (userIdProp: number) => {
  try {
    const allTasks = await prisma.task.findMany({
      where: {
        userId: userIdProp,
      },
    });

    return allTasks;
  } catch (error) {
    throw createHttpError(401, "Failed to fetch");
  }
};

export const getCompletedTasks = async (userIdProp: number) => {
  try {
    const completedTasks = await prisma.task.findMany({
      where: { isDone: true, userId: userIdProp },
    });

    return completedTasks;
  } catch (error) {
    throw createHttpError(401, "Failed to fetch");
  }
};

export const getIncompletedTasks = async (userIdProp: number) => {
  try {
    const incompletedTasks = await prisma.task.findMany({
      where: { isDone: false, userId: userIdProp },
    });

    return incompletedTasks;
  } catch (error) {
    throw createHttpError(401, "Failed to fetch");
  }
};

export const getNewestTasks = async (userIdProp: number) => {
  try {
    const newestTasks = await prisma.task.findMany({
      where: {
        userId: userIdProp,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return newestTasks;
  } catch (error) {
    throw createHttpError(401, "Failed to fetch");
  }
};

export const getTaskByPriority = async (
  priorityProp: string,
  userIdProp: number
) => {
  try {
    const tasksByPriority = await prisma.task.findMany({
      where: { priority: priorityProp, userId: userIdProp },
      orderBy: {
        createdAt: "desc",
      },
    });

    return tasksByPriority;
  } catch (error) {
    throw createHttpError(401, "Failed to fetch");
  }
};

export const getTasksByClosestDueDate = async (userIdProp: number) => {
  try {
    const tasksByClosestDueDate = await prisma.task.findMany({
      where: {
        userId: userIdProp,
        dueDate: {
          not: null,
        },
      },
      orderBy: {
        dueDate: "asc",
      },
    });

    return tasksByClosestDueDate;
  } catch (error) {
    throw createHttpError(401, "Failed to fetch");
  }
};

export const createProjectTask = async (data: {
  title: string;
  description: string;
  priority: string;
  userId: number;
  projectId: number;
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
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};
