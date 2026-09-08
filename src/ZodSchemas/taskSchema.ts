import { z } from "zod";
import { TASKSTATUS, TASKPRIORITY, TASKVISIBILITY } from "../types/commonTypes";

export const CreateTaskSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(500, "title must be up to 500 characters"),
    description: z
      .string()
      .max(5000, "description too long (up to 5000 characters expected)")
      .optional(),
    status: z
      .enum([TASKSTATUS.Todo, TASKSTATUS.In_progress, TASKSTATUS.Done])
      .optional(),
    priority: z
      .enum([TASKPRIORITY.Low, TASKPRIORITY.Medium, TASKPRIORITY.High])
      .optional(),
    visibility: z
      .enum([
        TASKVISIBILITY.Anyone,
        TASKVISIBILITY.List,
        TASKVISIBILITY.Only_me,
      ])
      .optional(),
    viewerUserIds: z.array(z.string()).optional(),
    assigneeId: z.string().optional(),
  })
  .refine(
    (data) =>
      data.visibility !== TASKVISIBILITY.List ||
      (data.viewerUserIds !== undefined && data.viewerUserIds.length > 0),
    {
      message: "At least one viewer is required when visibility is LIST",
      path: ["viewerUserIds"],
    },
  ); // path is where to put the validation error

export type CreateTaskFormData = z.infer<typeof CreateTaskSchema>;
