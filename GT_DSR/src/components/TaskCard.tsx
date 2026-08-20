//import { Task } from "../types/types";
import "../../styles/TaskCard.css"
import type { DraftTask } from "../types/types"
import { memo } from "react";

function TaskCard({title, status, deadline}: DraftTask) {
    return (
        <div className="task-card">
            <h4>{title}</h4>
            <h5>{deadline}</h5>
            <h6>{status}</h6>
        </div>
    );
}
export default memo(TaskCard);
// ANTI-PATTERN FIX 3: with memo React can check whether a TaskCard receives the same props as before or not