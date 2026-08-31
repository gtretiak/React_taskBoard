//import { Task } from "../types/types";
import "../../styles/TaskCard.css";
import type { TaskCardProps } from "../types/types";
import { memo } from "react";

function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  return (
    <article className="task-card">
      <h3>{task.title}</h3>
      <label htmlFor="completed">
        <input
          type="checkbox"
          id="completed"
          checked={task.completed}
          onChange={(event) => onUpdate(task.id, event.target.checked)}
        />
        Click if completed
      </label>
      <br />
      <br />
      <button type="button" onClick={() => onDelete(task.id)}>
        Delete Task
      </button>
    </article>
  );
}
export default memo(TaskCard);
