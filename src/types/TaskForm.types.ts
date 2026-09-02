import type { TaskStatus } from "./types";

export type TaskProps = {
  onAdd: (title: string) => void;
}; // onAdd is a prop that TaskForm receives
