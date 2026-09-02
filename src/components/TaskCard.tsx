import "../../styles/TaskCard.css";
import { TASKSTATUS, type TaskStatus } from "../types/commonTypes";
import type { Task } from "../types/responsesTypes";
import { useTaskStore } from "../Store/taskStore";
import { memo } from "react";

function TaskCard({ task }: { task: Task }) {
  const updateTask = useTaskStore((store) => store.updateTask);
  const deleteTask = useTaskStore((store) => store.deleteTask);
  const fetchTask = useTaskStore((state) => state.fetchTask);

  return (
    <article className="task-card">
      <h3>{task.title}</h3>
      <label htmlFor={`status-${task.id}`}>Status:</label>
      <select
        id={`status-${task.id}`}
        value={task.status}
        onChange={(event) =>
          updateTask(task.id, {
            title: task.title,
            description: task.description ?? "",
            status: event.target.value as TaskStatus,
            priority: task.priority,
            visibility: task.visibility,
            viewerUserIds: task.viewerUserIds,
          })
        }
      >
        <option value={TASKSTATUS.Todo}>To do</option>
        <option value={TASKSTATUS.In_progress}>In progress</option>
        <option value={TASKSTATUS.Done}>Done</option>
      </select>
      <br />
      <br />
      <button type="button" onClick={() => fetchTask(task.id)}>
        Open Details
      </button>
      <br />
      <br />
      <button type="button" onClick={() => deleteTask(task.id)}>
        Delete Task
      </button>
    </article>
  );
}
export default memo(TaskCard);
// ?? means null or undefined
