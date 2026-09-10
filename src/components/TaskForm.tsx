import { useState, useEffect, type SubmitEvent } from "react";
import "../../styles/TaskForm.css";
import { useTaskStore } from "../Store/taskStore";
import TaskFields from "./TaskFields";
import { useUserStore } from "../Store/userStore";
import {
  TASKSTATUS,
  type TaskStatus,
  TASKPRIORITY,
  type TaskPriority,
  TASKVISIBILITY,
  type TaskVisibility,
} from "../types/commonTypes";
import toast from "react-hot-toast";

interface TaskFormProps {
  onSuccess: (taskId: string) => void;
  onCancel: () => void;
}

function TaskForm({ onSuccess, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TASKSTATUS.Todo);
  const [priority, setPriority] = useState<TaskPriority>(TASKPRIORITY.Medium);
  const [visibility, setVisibility] = useState<TaskVisibility>(
    TASKVISIBILITY.Anyone,
  );
  const [assigneeId, setAssigneeId] = useState("");
  const [viewerUserIds, setViewerUserIds] = useState<string[]>([]);
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createTask = useTaskStore((store) => store.createTask);
  const creating = useTaskStore((state) => state.creating);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const newTask = await createTask({
        title,
        description,
        status,
        priority,
        visibility,
        viewerUserIds: visibility === TASKVISIBILITY.List ? viewerUserIds : [],
        assigneeId: assigneeId || undefined,
      });
      toast.success("Task created successfully!");
      setTitle(""); //clearing the input field after submission
      setDescription("");
      setStatus(TASKSTATUS.Todo);
      setPriority(TASKPRIORITY.Medium);
      setVisibility(TASKVISIBILITY.Anyone);
      setAssigneeId("");
      setViewerUserIds([]);
      onSuccess(newTask.id);
    } catch (error) {
      toast.error("Task creation failure. Try again, please");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Fill the form, please: </h2>
      <TaskFields
        prefix="create"
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
        disabled={creating}
      />

      <div>
        <label htmlFor="create-assignee">Assignee:</label>
        <select
          id="create-assignee"
          value={assigneeId}
          disabled={creating}
          onChange={(event) => setAssigneeId(event.target.value)}
        >
          <option value="">No assignee</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nickname}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={creating}>
        {creating ? (
          <>
            <span className="spinner" />
            Creating...{" "}
          </>
        ) : (
          "Add task"
        )}
      </button>

      <button type="button" disabled={creating} onClick={onCancel}>
        Cancel (Esc)
      </button>
    </form>
  );
}
export default TaskForm;
