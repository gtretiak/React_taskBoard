import { useState, type SubmitEvent } from "react";
import type { TaskStatus } from "../types/types";
import type { TaskProps } from "../types/TaskForm.types";
import "../../styles/TaskForm.css";

function TaskForm({ onAdd }: TaskProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [deadline, setDeadline] = useState<Date | null>(null);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (deadline !== null) onAdd(title, status, deadline);
    setTitle("");
    setStatus("TODO");
    setDeadline(null);
  } // event object is supplied by browser/React

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        id="title "
        type="text"
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
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
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
