import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { taskSchema } from "../models/validators/taskValidator";

export const taskValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    taskSchema.parse(req.body);
    next();
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(400).json({ errors: e.errors });
    } else {
      next(e);
    }
  }
};
