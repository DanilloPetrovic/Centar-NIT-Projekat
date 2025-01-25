import { Request, Response } from "express";
import * as taskService from "../services/taskServices";
import { AuthenticateRequest } from "../types/AuthenticatedRequest";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, priority, projectId, dueDate, userId } = req.body;

  const task = await taskService.createTask({
    title,
    description,
    priority,
    projectId,
    dueDate,
    userId,
  });

  res.status(201).json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.body;

  const deletedTask = await taskService.deleteTask(id);

  res.status(201).json(deleteTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id, title, description, priority, projectId, dueDate } = req.body;

  const updatedTask = await taskService.updateTask(id, {
    title,
    description,
    priority,
    projectId,
    dueDate,
  });

  res.status(201).json(updatedTask);
};
