import { useState, type SubmitEvent } from "react";
import type { TaskProps } from "../types/TaskForm.types";
import "../../styles/TaskForm.css";

function TaskForm({ onAdd }: TaskProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd(title);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create task</h2>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        placeholder="e.g. Implement the feature we discussed with Tom"
        value={title}
        required
        onChange={(event) => setTitle(event.target.value)}
      />
      <br />
      <button type="submit">Add task</button>
    </form>
  );
}
export default TaskForm;
