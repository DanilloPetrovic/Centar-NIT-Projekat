import { Request, Response } from "express";
import * as userService from "../services/userServices";
import { AuthenticateRequest } from "../types/AuthenticatedRequest";

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const user = await userService.regiter({ email, password, username });

  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userService.login({ email, password });

  res.status(201).json(user);
};

export const getUserInfoById = async (
  req: AuthenticateRequest,
  res: Response
) => {
  const userID = req.user?.id;

  if (!userID) {
    return res.status(400).json({ error: "User ID is missing" });
  }

  const user = await userService.getUserInfoById(Number(userID));

  res.status(200).json(user);
};
