export const ROLE = {
  Admin: "ADMIN",
  User: "USER",
} as const; // ROLE is a const object

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

export type Role = (typeof ROLE)[keyof typeof ROLE]; // taking the key of that object and creating with them
export type TaskStatus = (typeof TASKSTATUS)[keyof typeof TASKSTATUS];
export type TaskPriority = (typeof TASKPRIORITY)[keyof typeof TASKPRIORITY];
export type TaskVisibility = (typeof TASKVISIBILITY)[keyof typeof TASKVISIBILITY];
export type AssignmentStatus = (typeof ASSIGNMENTSTATUS)[keyof typeof ASSIGNMENTSTATUS];
  
export interface UserRef {
  id: string;
  nickname: string;
  email?: string | null; // ? means optional (not required; nullable - allowed to be null
}
export interface UserPicker {
  id: string;
  nickname: string;
  email?: string | null;
  role: Role;
}
export interface AdminUserRow {
  id: string;
  nickname: string;
  email?: string | null;
  role: Role;
  bannedAt?: Date | null;
  createdAt: Date;
}
export interface TagEntry {
  id: string;
  name: string; // normalized lowercase
}
export interface DraftTask {
  id: string;
  title: string;
  status: TaskStatus;
  deadline: Date;
}
export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  visibility: TaskVisibility;
  creator: UserRef;
  assignee?: UserRef | null;
  assignmentStatus: AssignmentStatus;
  assignedById?: string | null;
  viewerUserIds: string[];
  tags: TagEntry[];
  createdAt: Date;
  updatedAt: Date;
}
export interface TaskListResponse {
  items: Task[];
  total: number;
  page: number;
  pageSize: number;
}
export interface RegisterRequest {
  nickname: string;
  password: string;
  email?: string;
}
export interface LoginRequest {
  nickname: string;
  password: string;
}
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
export interface AuthResponse {
  accessToken: string;
  user: UserPicker;
}
export interface CreateTaskRequest {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  visibility?: TaskVisibility;
  viewerUserIds: string[];
  assigneeId?: string;
}
export interface ReplaceTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  visibility: TaskVisibility;
  viewerUserIds: string[];
}
export interface UpdateAssigneeStatusRequest {
  status: TaskStatus;
}
export interface AssignTaskRequest {
  assigneeId: string;
}
export interface RejectAssignmentRequest {
  blockAssigner?: boolean;
  comment?: string;
}
export interface AddTagRequest {
  name: string;
}
export interface CreateBlockRequest {
  blockedUserId: string;
  comment?: string;
}
export interface AssignmentBlock {
  id: string;
  blockerId: string;
  blockedUserId: string;
  comment?: string | null;
  createdAt: Date;
}
export interface AssignmentBlockWithUser {
  id: string;
  blockerId: string;
  blockedUserId: string;
  comment?: string | null;
  createdAt: Date;
  blockedUser: UserRef;
}
export interface AssignmentBlockAdminRow {
  id: string;
  blockerId: string;
  blockedUserId: string;
  comment?: string | null;
  createdAt: Date;
  blocker: UserRef;
  blockedUser: UserRef;
}
export interface OkResponse {
  ok: true;
}
