import { useState, type SubmitEvent } from "react";
import "../../styles/TaskForm.css";
import { useTaskStore } from "../Store/taskStore";

function TaskForm() {
  const [title, setTitle] = useState("");
  const createTask = useTaskStore((store) => store.createTask);
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    await createTask({ title, viewerUserIds: [] }); //temp [] to decide on visibility later
    setTitle(""); //clearing the input field after submission
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
