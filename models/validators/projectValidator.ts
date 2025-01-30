import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "requied").max(20, "max 20 characters"),
  description: z.string().max(150, "max 150 charachters"),
  deadline: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .nullable()
    .optional(),
  isDone: z.boolean().optional(),
});
