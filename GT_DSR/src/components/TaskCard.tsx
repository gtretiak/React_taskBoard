//import { Task } from "../types/types";
type Status = "TODO" | "IN_PROGRESS" | "DONE";
interface Task {
    title:string;
    status:Status;
};

function TaskCard({title, status}: Task) {
    return (
        <div>
            <h2>Task:{title} - status:{status}</h2>
        </div>
    );
}
export default TaskCard;