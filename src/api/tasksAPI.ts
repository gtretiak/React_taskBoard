import type { Task, TaskListResponse } from "../types/responsesTypes";
import type {
  CreateTaskRequest,
  ReplaceTaskRequest,
} from "../types/requestsTypes";
import { apiRequest } from "./clientAPI";

export async function getTasksAPI(): Promise<TaskListResponse> {
  const response = await apiRequest("/tasks", { auth: true });
  return response.json();
} // GET /tasks

export async function getTaskAPI(id: string): Promise<Task> {
  const response = await apiRequest(`/tasks/${id}`, { auth: true });
  return response.json();
} // GET /tasks/id

export async function createTaskAPI(data: CreateTaskRequest): Promise<Task> {
  const response = await apiRequest("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    auth: true,
    body: JSON.stringify(data),
  });
  return response.json();
} // TaskForm -> POST /tasks

export async function updateTaskAPI(
  id: string,
  data: ReplaceTaskRequest,
): Promise<Task> {
  const response = await apiRequest(`/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    auth: true,
    body: JSON.stringify(data),
  });
  return response.json();
} // PATCH /tasks/id

export async function deleteTaskAPI(id: string): Promise<void> {
  await apiRequest(`/tasks/${id}`, {
    method: "DELETE",
    auth: true,
  });
} // DELETE /tasks/id
