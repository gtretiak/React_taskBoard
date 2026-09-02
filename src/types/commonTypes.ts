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

// types
export type Role = (typeof ROLE)[keyof typeof ROLE]; // taking the key of that object and creating with them
export type TaskStatus = (typeof TASKSTATUS)[keyof typeof TASKSTATUS];
export type TaskPriority = (typeof TASKPRIORITY)[keyof typeof TASKPRIORITY];
export type TaskVisibility =
  (typeof TASKVISIBILITY)[keyof typeof TASKVISIBILITY];
export type AssignmentStatus =
  (typeof ASSIGNMENTSTATUS)[keyof typeof ASSIGNMENTSTATUS];
