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

export const updateTask = async (req: Request, res: Response) => {
  const { id, title, description, priority, projectId, dueDate, isDone } =
    req.body;

  const updatedTask = await taskService.updateTask(id, {
    title,
    description,
    priority,
    projectId,
    dueDate,
    isDone,
  });

  res.status(201).json(updatedTask);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedTask = await taskService.deleteTask(Number(id));

  res.status(201).json(deletedTask);
};

export const completeTask = async (req: Request, res: Response) => {
  const { id } = req.body;

  const isDoneChangeTask = await taskService.isDoneTrue(id);

  res.status(201).json(isDoneChangeTask);
};

export const incompleteTask = async (req: Request, res: Response) => {
  const { id } = req.body;

  const isDoneChangeTask = await taskService.isDoneFalse(id);

  res.status(201).json(isDoneChangeTask);
};

export const getAllTasks = async (req: Request, res: Response) => {
  const allTasks = await taskService.getAllTasks();

  res.status(201).json(allTasks);
};

export const getCompletedTasks = async (req: Request, res: Response) => {
  const completedTasks = await taskService.getCompletedTasks();

  res.status(201).json(completedTasks);
};

export const getIncompletedTasks = async (req: Request, res: Response) => {
  const incompletedTasks = await taskService.getIncompletedTasks();

  res.status(201).json(incompletedTasks);
};

export const getNewestTasks = async (req: Request, res: Response) => {
  const newestTasks = await taskService.getNewestTasks();

  res.status(201).json(newestTasks);
};

export const getTasksByPriority = async (req: Request, res: Response) => {
  const { priority } = req.params;

  const tasksByPriority = await taskService.getTaskByPriority(priority);

  res.status(201).json(tasksByPriority);
};

export const getTasksByClosestDueDate = async (req: Request, res: Response) => {
  const tasksByClosestDueDate = await taskService.getTasksByClosestDueDate();

  res.status(201).json(tasksByClosestDueDate);
};
