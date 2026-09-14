import "../../styles/TaskCard.css";
import { ROLE, TASKSTATUS, type TaskStatus } from "../types/commonTypes";
import type { Task } from "../types/responsesTypes";
import { useTaskStore } from "../Store/taskStore";
import { useAuthStore } from "../Store/authStore";
import { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface TaskCardProps {
  task: Task;
  onDelete: (task: Task) => void; // we need a callback for that function!
}
function TaskCard({ task, onDelete }: TaskCardProps) {
  const updateTask = useTaskStore((store) => store.updateTask);
  const navigate = useNavigate();
  const location = useLocation(); // allows to save the task board screen as a background layer, when navigating to /tasks/:id
  const user = useAuthStore((state) => state.user);
  const hasWRPermission =
    user !== null && (user.id === task.creator.id || user.role === ROLE.Admin);

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
      <button
        className="button"
        type="button"
        onClick={() =>
          navigate(`/tasks/${task.id}`, {
            state: {
              backgroundLocation: location,
            },
          })
        }
      >
        Open details
      </button>
      <br />
      <br />
      {hasWRPermission && (
        <button className="button" type="button" onClick={() => onDelete(task)}>
          Delete task
        </button>
      )}
    </article>
  );
}
export default memo(TaskCard); // memo lets to skip re-rendering the component if props haven't changed
// htmlFor={`status-${task.id}`} ensures uniquness
// ?? means null or undefined
