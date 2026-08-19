//import { Task } from "../types/types";
import "../../styles/TaskCard.css"
import type { DraftTask } from "../types/types"

function TaskCard({title, status, deadline}: DraftTask) {
    return (
        <div className="task-card">
            <h3>{title}</h3>
            <h4>{status}</h4>
            <h5>{deadline}</h5>
        </div>
    );
}
export default TaskCard;