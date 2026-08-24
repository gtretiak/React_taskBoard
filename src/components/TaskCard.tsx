//import { Task } from "../types/types";
import "../../styles/TaskCard.css";
import type { DraftTask } from "../types/types";
import { memo } from "react";

function TaskCard({ title, status, deadline }: DraftTask) {
  return (
    <article className="task-card">
      <h3>{title}</h3>
      <div>{status}</div>
      <time>{deadline?.toLocaleDateString()}</time>
    </article>
  );
}
export default memo(TaskCard);
// ANTI-PATTERN FIX 3: with memo React can check whether a TaskCard receives the same props as before or not