import { useNavigate, useParams } from "react-router-dom";
import { useTaskStore } from "../Store/taskStore";
import { useEffect } from "react";

function TaskDetailsPage() {
  const { id } = useParams();
  const task = useTaskStore((state) => state.currentTask);
  const loading = useTaskStore((state) => state.loading);
  const error = useTaskStore((state) => state.error);
  const fetchTask = useTaskStore((state) => state.fetchTask);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) fetchTask(id);
  }, [id, fetchTask]);

  if (loading) return <p>Loading the task...</p>;
  if (error) return <p>{error}</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <div>
      <button type="button" onClick={() => navigate("/tasks")}>
        Back to Tasks
      </button>
      <article>
        <h1>{task.title}</h1>
        <p>
          <strong>Description:</strong> {task.description || "No description"}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Priority:</strong> {task.priority}
        </p>
        <p>
          <strong>Visibility:</strong> {task.visibility}
        </p>
      </article>
    </div>
  );
}
export default TaskDetailsPage;
