import type { Task, TaskListResponse } from "../types/responsesTypes";
import type {
  CreateTaskRequest,
  ReplaceTaskRequest,
} from "../types/requestsTypes";
import { apiRequest } from "./clientAPI";

function mapTaskDate(task: Task): Task {
  return {
    ...task,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
  };
} // takes Task with dates as strings, returns Task with dates as Dates

export async function getTasksAPI(): Promise<TaskListResponse> {
  const response = await apiRequest("/tasks", { auth: true });
  const tasks = await response.json(); // here Task's dates are strings
  return { ...tasks, items: tasks.items.map(mapTaskDate) }; // here not anymore
} // GET /tasks

export async function getTaskAPI(id: string): Promise<Task> {
  const response = await apiRequest(`/tasks/${id}`, { auth: true });
  const task = await response.json();
  return mapTaskDate(task);
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
  const task = await response.json();
  return mapTaskDate(task);
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
  const task = await response.json();
  return mapTaskDate(task);
} // PATCH /tasks/id

export async function deleteTaskAPI(id: string): Promise<void> {
  await apiRequest(`/tasks/${id}`, {
    method: "DELETE",
    auth: true,
  });
} // DELETE /tasks/id
