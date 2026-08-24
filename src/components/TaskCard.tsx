//import { Task } from "../types/types";
import "../../styles/TaskCard.css";
import type { DraftTask } from "../types/types";

function TaskCard({ title, status, deadline }: DraftTask) {
  return (
    <article className="task-card">
      <h3>{title}</h3>
      <span>{status}</span>
      <time>{deadline?.toLocaleDateString()}</time>
    </article>
  );
}
export default TaskCard;
