import type {
  TaskStatus,
  TaskVisibility,
  AssignmentStatus,
  Role,
} from "./commonTypes";

// API Response interfaces (backend, properties will be present, but might be null):
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  visibility: TaskVisibility;
  creator: UserRef;
  assignee: UserRef | null;
  assignmentStatus: AssignmentStatus;
  assignedById: string | null;
  viewerUserIds: string[];
  tags: TagEntry[];
  createdAt: Date; // will be received as a string from the API (introduce TaskResponse with string perhaps)
  updatedAt: Date; // same
}
export interface TaskListResponse {
  items: Task[];
  total: number;
  page: number;
  pageSize: number;
}
export interface AuthResponse {
  accessToken: string;
  user: UserPicker;
}
export interface UserPicker {
  id: string;
  nickname: string;
  email: string | null;
  role: Role;
}
export interface AdminUserRow {
  id: string;
  nickname: string;
  email: string | null;
  role: Role;
  bannedAt: Date | null;
  createdAt: Date;
}
export interface AssignmentBlock {
  id: string;
  blockerId: string;
  blockedUserId: string;
  comment: string | null;
  createdAt: Date;
}
export interface AssignmentBlockWithUser {
  id: string;
  blockerId: string;
  blockedUserId: string;
  comment: string | null;
  createdAt: Date;
  blockedUser: UserRef;
}
export interface AssignmentBlockAdminRow {
  id: string;
  blockerId: string;
  blockedUserId: string;
  comment: string | null;
  createdAt: Date;
  blocker: UserRef;
  blockedUser: UserRef;
}
export interface OkResponse {
  ok: true;
}
export interface UserRef {
  id: string;
  nickname: string;
  email: string | null; // ? means optional (not required; nullable - allowed to be null
}
export interface TagEntry {
  id: string;
  name: string; // normalized lowercase
}
