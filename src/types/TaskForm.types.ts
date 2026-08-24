import type { TaskStatus } from "./types";

export type TaskProps = {
  onAdd: (title: string, status: TaskStatus, deadline: Date) => void;
}; // onAdd is a prop that TaskForm receives
