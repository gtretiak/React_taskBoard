import type { TaskStatus, TaskVisibility } from "./commonTypes";

// API Request interfaces (frontend, some properties might not exist, they are optional):
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
