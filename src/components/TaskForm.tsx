import { useState, type SubmitEvent } from "react";
import { TASKSTATUS, type TaskStatus } from "../types/types";
import type { TaskProps } from "../types/TaskForm.types";
import "../../styles/TaskForm.css";

function TaskForm({ onAdd }: TaskProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TASKSTATUS.Todo);
  const [deadline, setDeadline] = useState<Date | null>(null);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (deadline !== null) onAdd(title, status, deadline);
    setTitle("");
    setStatus(TASKSTATUS.Todo);
    setDeadline(null);
  } // event object is supplied by browser/React

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create task</h2>
      <label htmlFor="title">Title:</label>
      <input
        id="title "
        type="text"
        placeholder="e.g. Implement the feature we discussed with Tom"
        value={title}
        required
        onChange={(event) => setTitle(event.target.value)}
      />
      <label htmlFor="status">Status:</label>
      <select
        id="status"
        value={status}
        onChange={(event) => setStatus(event.target.value as TaskStatus)}
      >
        <option value={TASKSTATUS.Todo}>Todo</option>
        <option value={TASKSTATUS.In_progress}>In Progress</option>
        <option value={TASKSTATUS.Done}>Done</option>
      </select>
      <label htmlFor="deadline">Deadline:</label>
      <input
        id="deadline"
        type="date"
        value={deadline ? deadline.toISOString().split("T")[0] : ""}
        onChange={(event) =>
          setDeadline(event.target.value ? new Date(event.target.value) : null)
        }
      />
      <br />
      <button type="submit">Add task</button>
    </form>
  ); // onSubmit={handleSubmit} is React event prop for the event handler
  // onChange means React calls the defined function when the user changes the input, where event.target is the element that generates the event
}
export default TaskForm;
