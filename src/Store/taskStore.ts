import { create } from "zustand"; // State manager
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
  creating: boolean;
  updatingTaskId: string | null;
  deletingTaskId: string | null;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchTask: (id: string) => Promise<void>;
  createTask: (data: CreateTaskRequest) => Promise<Task>;
  updateTask: (id: string, data: ReplaceTaskRequest) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  currentTask: null,
  loading: false,
  creating: false,
  updatingTaskId: null,
  deletingTaskId: null,
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
      }); // if what was caught is an instance of standard Error object - we write its message, otherwise - the secondary one
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
      creating: true,
      error: null,
    });
    try {
      const newTask = await createTaskAPI(data); // TaskForm -> POST /tasks
      set((state) => ({
        tasks: [...state.tasks, newTask],
        creating: false,
      }));
      return newTask;
    } catch (error) {
      set({
        creating: false,
        error: error instanceof Error ? error.message : "Failed to create task",
      });
      throw error;
    }
  },

  updateTask: async (id, data) => {
    set({
      updatingTaskId: id,
      error: null,
    });
    try {
      const updatedTask = await updateTaskAPI(id, data); // PATCH /tasks/id
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
        currentTask:
          state.currentTask?.id === id ? updatedTask : state.currentTask,
        updatingTaskId: null,
      }));
    } catch (error) {
      set({
        updatingTaskId: null,
        error: error instanceof Error ? error.message : "Failed to update task",
      });
      throw error;
    }
  },

  deleteTask: async (id) => {
    set({
      error: null,
      deletingTaskId: id,
    });
    try {
      await deleteTaskAPI(id); // DELETE /tasks/id
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        currentTask: state.currentTask?.id === id ? null : state.currentTask,
        deletingTaskId: null,
      }));
    } catch (error) {
      set({
        deletingTaskId: null,
        error: error instanceof Error ? error.message : "Failed to delete task",
      });
      throw error;
    }
  },
}));
