import { Request } from "express";

export interface AuthenticateRequest extends Request {
  user?: { id: string; email: string };
}
