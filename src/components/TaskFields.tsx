import "../../styles/TaskFields.css";
import {
  TASKPRIORITY,
  type TaskPriority,
  TASKSTATUS,
  type TaskStatus,
  TASKVISIBILITY,
  type TaskVisibility,
} from "../types/commonTypes";
import type { UserPicker } from "../types/responsesTypes";

interface TaskFieldsProps {
  prefix: string;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  status: TaskStatus;
  setStatus: (value: TaskStatus) => void;
  priority: TaskPriority;
  setPriority: (value: TaskPriority) => void;
  visibility: TaskVisibility;
  setVisibility: (value: TaskVisibility) => void;
  viewerUserIds: string[];
  setViewerUserIds: (value: string[]) => void;
  users: UserPicker[];
  disabled?: boolean;
}

function TaskFields({
  prefix,
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  priority,
  setPriority,
  visibility,
  setVisibility,
  viewerUserIds,
  setViewerUserIds,
  users,
  disabled = false,
}: TaskFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor={`${prefix}-title`}>Title:</label>
        <input
          id={`${prefix}-title`}
          type="text"
          value={title}
          required
          disabled={disabled}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor={`${prefix}-description`}>Description:</label>
        <input
          id={`${prefix}-description`}
          type="text"
          value={description}
          disabled={disabled}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor={`${prefix}-status`}>Status:</label>
        <select
          id={`${prefix}-status`}
          value={status}
          disabled={disabled}
          onChange={(event) => setStatus(event.target.value as TaskStatus)}
        >
          <option value={TASKSTATUS.Todo}>To do</option>
          <option value={TASKSTATUS.In_progress}>In progress</option>
          <option value={TASKSTATUS.Done}>Done</option>
        </select>
      </div>

      <div>
        <label htmlFor={`${prefix}-priority`}>Priority:</label>
        <select
          id={`${prefix}-priority`}
          value={priority}
          disabled={disabled}
          onChange={(event) => setPriority(event.target.value as TaskPriority)}
        >
          <option value={TASKPRIORITY.Low}>Low</option>
          <option value={TASKPRIORITY.Medium}>Medium</option>
          <option value={TASKPRIORITY.High}>High</option>
        </select>
      </div>

      <div>
        <label htmlFor={`${prefix}-visibility`}>Visibility:</label>
        <select
          id={`${prefix}-visibility`}
          value={visibility}
          disabled={disabled}
          onChange={(event) =>
            setVisibility(event.target.value as TaskVisibility)
          }
        >
          <option value={TASKVISIBILITY.Anyone}>Anyone</option>
          <option value={TASKVISIBILITY.List}>Selected users</option>
          <option value={TASKVISIBILITY.Only_me}>Only me</option>
        </select>
      </div>

      {visibility === TASKVISIBILITY.List && (
        <fieldset className="viewer-list">
          <legend>Viewers: </legend>
          {users.map((user) => (
            <label key={user.id} className="viewer-option">
              <input
                type="checkbox"
                checked={viewerUserIds.includes(user.id)}
                onChange={(event) => {
                  if (event.target.checked)
                    setViewerUserIds([...viewerUserIds, user.id]);
                  else {
                    setViewerUserIds(
                      viewerUserIds.filter((id) => id !== user.id),
                    );
                  }
                }}
                disabled={disabled}
              />
              <span>{user.nickname}</span>
            </label>
          ))}
        </fieldset>
      )}
    </>
  );
}
export default TaskFields;
