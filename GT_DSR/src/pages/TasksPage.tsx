import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function TasksPage() {
    return (
        <div>
            <h1>Tasks placeholder</h1>
            <TaskForm />
            <h3>Draft notes</h3>
            <TaskCard title="Buy something" status="TODO" /> 
            <TaskCard title="Sell something" status="DONE"/> 
        </div>
    );
}
export default TasksPage;