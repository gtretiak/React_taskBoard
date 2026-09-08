import { create } from "zustand";
import type {
  CreateTaskRequest,
  ReplaceTaskRequest,
} from "../types/requestsTypes";
import type { Task } from "../types/responsesTypes";
import {
  getTasksAPI,
  getTaskAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "../api/tasksAPI";

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchTask: (id: string) => Promise<void>;
  createTask: (data: CreateTaskRequest) => Promise<void>;
  updateTask: (id: string, data: ReplaceTaskRequest) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({
      loading: true,
      error: null,
    });
    try {
      const response = await getTasksAPI(); // GET /tasks
      set({
        tasks: response.items,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to load tasks",
      });
    }
  },

  fetchTask: async (id: string) => {
    set({
      loading: true,
      error: null,
    });
    try {
      const task = await getTaskAPI(id); // GET /tasks/id
      set({
        currentTask: task,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to load task",
      });
    }
  },

  createTask: async (data) => {
    set({
      loading: true,
      error: null,
    });
    try {
      const newTask = await createTaskAPI(data); // TaskForm -> POST /tasks
      set((state) => ({
        tasks: [...state.tasks, newTask],
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to create task",
      });
    }
  },

  updateTask: async (id, data) => {
    set({
      loading: true,
      error: null,
    });
    try {
      const updatedTask = await updateTaskAPI(id, data); // PATCH /tasks/id
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to update task",
      });
    }
  },

  deleteTask: async (id) => {
    set({
      loading: true,
      error: null,
    });
    try {
      await deleteTaskAPI(id); // DELETE /tasks/id
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to delete task",
      });
    }
  },
}));
