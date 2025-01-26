import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "required").max(20, "max 20 characters"),
  description: z.string().max(150, "max 150 characters"),
  dueDate: z.date(),
});
