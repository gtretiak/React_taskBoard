import { type Task } from "./responsesTypes";

// constants
export const ROLE = {
  Admin: "ADMIN",
  User: "USER",
} as const;
export const TASKSTATUS = {
  Todo: "TODO",
  In_progress: "IN_PROGRESS",
  Done: "DONE",
} as const;
export const TASKPRIORITY = {
  Low: "LOW",
  Medium: "MEDIUM",
  High: "HIGH",
} as const;
export const TASKVISIBILITY = {
  Only_me: "ONLY_ME",
  List: "LIST",
  Anyone: "ANYONE",
} as const;
export const ASSIGNMENTSTATUS = {
  None: "NONE",
  Pending: "PENDING",
  Approved: "APPROVED",
  Rejected: "REJECTED",
} as const;
export const SORTTYPE = {
  title: "title",
  status: "status",
  priority: "priority",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
} as const;
export const SORTDIR = {
  ascending: "ASC",
  descending: "DES",
} as const;

// types
export type Role = (typeof ROLE)[keyof typeof ROLE]; // taking the key of that object and creating with them
export type TaskStatus = (typeof TASKSTATUS)[keyof typeof TASKSTATUS];
export type TaskPriority = (typeof TASKPRIORITY)[keyof typeof TASKPRIORITY];
export type TaskVisibility =
  (typeof TASKVISIBILITY)[keyof typeof TASKVISIBILITY];
export type AssignmentStatus =
  (typeof ASSIGNMENTSTATUS)[keyof typeof ASSIGNMENTSTATUS];
export type SortingType = (typeof SORTTYPE)[keyof typeof SORTTYPE];
export type SortingDir = (typeof SORTDIR)[keyof typeof SORTDIR];

export interface WorkerRequest {
  tasks: Task[];
  search: string;
  sortBy: SortingType;
  sortDir: SortingDir;
} // defines what the worker receives from the main thread
export const statusOrder: Record<TaskStatus, number> = {
  [TASKSTATUS.Todo]: 0,
  [TASKSTATUS.In_progress]: 1,
  [TASKSTATUS.Done]: 2,
};
export const priorityOrder: Record<TaskPriority, number> = {
  [TASKPRIORITY.Low]: 0,
  [TASKPRIORITY.Medium]: 1,
  [TASKPRIORITY.High]: 2,
};
