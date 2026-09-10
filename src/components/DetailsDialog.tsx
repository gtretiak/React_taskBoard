import { useNavigate, useParams } from "react-router-dom";
import { useTaskStore } from "../Store/taskStore";
import { useState, useEffect } from "react";
import TaskDialog from "./TaskDialog";
import { useAuthStore } from "../Store/authStore";
import { ROLE } from "../types/commonTypes";
import DeleteDialog from "./DeleteDialog";
import EditTaskForm from "./EditTaskForm";

function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = useTaskStore((state) => state.currentTask);
  const loading = useTaskStore((state) => state.loading);
  const error = useTaskStore((state) => state.error);

  const fetchTask = useTaskStore((state) => state.fetchTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const deletingTaskId = useTaskStore((state) => state.deletingTaskId);

  const user = useAuthStore((state) => state.user);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditDialog, setIsEditDialog] = useState(false);

  useEffect(() => {
    if (id) fetchTask(id);
  }, [id, fetchTask]);

  if (loading) return <p>Loading the task...</p>;
  if (error) return <p>{error}</p>;
  if (!task) return <p>Task not found</p>;

  const taskId = task.id; // to persuade TS that Task is not null

  const hasWRPermission =
    user !== null && (user.id === task.creator.id || user.role === ROLE.Admin);

  async function handleDelete() {
    try {
      await deleteTask(taskId);
      navigate(-1);
    } catch {}
  }

  return (
    <>
      <TaskDialog
        open={true}
        title={isEditDialog ? "Edit task" : task.title}
        onCancel={() => {
          if (isEditDialog) setIsEditDialog(false);
          else navigate(-1);
        }}
      >
        {isEditDialog ? (
          <EditTaskForm
            task={task}
            onSuccess={() => setIsEditDialog(false)}
            onCancel={() => setIsEditDialog(false)}
          />
        ) : (
          <>
            <article>
              <p>
                <strong>Description:</strong>{" "}
                {task.description || "No description"}
              </p>
              <p>
                <strong>Status:</strong> {task.status || "Status not set"}
              </p>
              <p>
                <strong>Priority:</strong> {task.priority || "Priority not set"}
              </p>
              <p>
                <strong>Visibility:</strong>{" "}
                {task.visibility || "Visibility not set"}
              </p>
              <p>
                <strong>Responsible:</strong>{" "}
                {task.assignee?.nickname || "Nobody assigned yet"}
              </p>
            </article>

            <div className="dialog-actions">
              <button
                className="button"
                type="button"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

              {hasWRPermission && (
                <>
                  <button
                    className="button"
                    type="button"
                    onClick={() => {
                      setIsEditDialog(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="button"
                    type="button"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </TaskDialog>

      <DeleteDialog
        open={showDeleteDialog}
        taskTitle={task.title}
        deleting={deletingTaskId === task.id}
        onCancel={() => {
          if (deletingTaskId === null) setShowDeleteDialog(false);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default TaskDetailsPage;
