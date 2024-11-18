import { z } from "zod";

export const taskFormSchema = z.object({
  description: z
    .string({ required_error: "Description is required" })
    .max(500, "Description should not exceed 500 characters"),
  title: z.string({ required_error: "Task title is required" }),
});

export const taskFormDefaultValue = {
  description: "",
  title: "",
};
