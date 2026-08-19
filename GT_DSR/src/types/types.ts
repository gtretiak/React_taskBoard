export type Role = "USER" | "ADMIN";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskVisibility = "ONLY_ME" | "LIST" | "ANYONE";
export type AssignmentStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED";
export interface UserRef {
  id: string;
  nickname: string;
  email?: string | null; // ? means optional (not required; nullable - allowed to be null
};
export interface UserPicker {
  id: string;
  nickname: string;
  email?: string | null;
  role: Role;
};
export interface AdminUserRow {
  id: string;
  nickname: string;
  email?: string | null;
  role: Role;
  bannedAt?: string | null; // Date
  createdAt: string; // Date
};
export interface TagEntry {
  id: string;
  name: string; // normalized lowercase
};
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
  createdAt: string; // Date
  updatedAt: string; // Date
};
export interface TaskListResponse {
  items:Task[];
  total: number;
  page: number;
  pageSize: number;
};
export interface RegisterRequest {
  nickname: string;
  password: string;
  email?: string;
};
export interface LoginRequest {
  nickname: string;
  password: string;
};
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
};
export interface AuthResponse {
  accessToken: string;
  user: UserPicker;
};
export interface CreateTaskRequest {
  title: string;
  description?:string;
  status?: TaskStatus;
  priority?: TaskPriority;
  visibility?: TaskVisibility;
  viewerUserIds: string[];
  assigneeId?: string;
};
export interface ReplaceTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  visibility: TaskVisibility;
  viewerUserIds: string[];
};
export interface UpdateAssigneeStatusRequest {
  status: TaskStatus;
};
export interface AssignTaskRequest {
  assigneeId: string;
};
export interface RejectAssignmentRequest {
  blockAssigner?: boolean;
  comment?: string;
};
export interface AddTagRequest {
  name:string;
};
export interface CreateBlockRequest {
  blockedUserId: string;
  comment?: string;
};
export interface AssignmentBlock {
  id:string;
  blockerId:string;
  blockedUserId:string;
  comment?:string | null;
  createdAt:string; // Date
};
export interface AssignmentBlockWithUser {
  id:string;
  blockerId:string;
  blockedUserId:string;
  comment?: string | null;
  createdAt: string; // Date
  blockedUser:UserRef;
};
export interface AssignmentBlockAdminRow {
  id:string;
  blockerId:string;
  blockedUserId:string;
  comment?:string | null;
  createdAt:string; // Date
  blocker:UserRef;
  blockedUser:UserRef;
};
export interface OkResponse {
  ok: true;
};