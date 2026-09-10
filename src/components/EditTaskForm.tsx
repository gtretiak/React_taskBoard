import { useState, useEffect, type SubmitEvent } from "react";
import type { ReplaceTaskRequest } from "../types/requestsTypes";
import type { Task } from "../types/responsesTypes";
import TaskFields from "./TaskFields";
import { useTaskStore } from "../Store/taskStore";
import { useUserStore } from "../Store/userStore";
import {
  type TaskStatus,
  type TaskPriority,
  TASKVISIBILITY,
  type TaskVisibility,
} from "../types/commonTypes";
import toast from "react-hot-toast";

interface EditTaskFormProps {
  task: Task;
  onSuccess: () => void;
  onCancel: () => void;
}

function EditTaskForm({ task, onSuccess, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [visibility, setVisibility] = useState<TaskVisibility>(task.visibility);
  const [viewerUserIds, setViewerUserIds] = useState<string[]>(
    task.viewerUserIds,
  );

  const updateTask = useTaskStore((state) => state.updateTask);
  const updatingTaskId = useTaskStore((state) => state.updatingTaskId);
  const updating = updatingTaskId === task.id;

  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data: ReplaceTaskRequest = {
      title,
      description,
      status,
      priority,
      visibility,
      viewerUserIds: visibility === TASKVISIBILITY.List ? viewerUserIds : [],
    };
    try {
      await updateTask(task.id, data);
      toast.success("Task updated successfully");
      onSuccess();
    } catch (error) {
      toast.error("Task changing failure. Try again, please");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TaskFields
        prefix="edit"
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        visibility={visibility}
        setVisibility={setVisibility}
        viewerUserIds={viewerUserIds}
        setViewerUserIds={setViewerUserIds}
        users={users}
        disabled={updating}
      />

      <div className="dialog-actions">
        <button
          className="button"
          type="button"
          onClick={onCancel}
          disabled={updating}
        >
          Cancel
        </button>

        <button className="button" type="submit" disabled={updating}>
          {updating ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;
