import { useState, type SubmitEvent } from "react";
import type { TaskStatus } from "../types/types"
import "../../styles/TaskForm.css"

type TaskProps = {
    onAdd: (title:string, status: TaskStatus, deadline:string) => void;
}; // onAdd is a prop that TaskForm receives

function TaskForm({onAdd}:TaskProps) {
    const [title, setTitle] = useState("");   
    const [status, setStatus] = useState<TaskStatus>("TODO");
    const [deadline, setDeadline] = useState("");
    
    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        onAdd(title, status, deadline);
        setTitle("");
        setStatus("TODO");
        setDeadline("");
    }// event object is supplied by browser/React
    return (
        <form className="task-form" onSubmit={handleSubmit}>
        <h4>Title:</h4>
        <input type="text" value={title} required onChange={(event) => setTitle(event.target.value)}/>
        <h4>Status:</h4>
        <select value={status} onChange={(event) => setStatus(event.target.value as TaskStatus)}>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
        </select>
        <h4>Deadline:</h4>
        <input type="text" value={deadline} onChange={(event) => setDeadline(event.target.value)}/>
        <br />
        <button type="submit">Add task</button>
        </form>
    );// onSubmit={handleSubmit} is React event prop for the event handler 
    // onChange means React calls the defined function when the user changes the input, where event.target is the element that generates the event
}
export default TaskForm;