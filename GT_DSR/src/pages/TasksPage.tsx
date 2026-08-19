import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useState } from "react"; // useState()
import type { TaskStatus, DraftTask } from "../types/types"

function TasksPage() {
    const [tasks, setTasks] = useState<DraftTask[]>([]);
    // state contains an array of Task objects, initially empty
    function addTask(title:string, status:TaskStatus,deadline:string) {
        const newTask:DraftTask = {
        id:crypto.randomUUID(),
        title:title,
        status:status,
        deadline:deadline,
    };
    // using given parameters and generated random UUID, it creates a new Task
    setTasks([...tasks, newTask]);
    // ... is a spread operator, takes the contents of tasks, adds new Task and puts all them into a new array
}
    return (
        <div>
            <h1>Tasks page</h1>
            <TaskForm onAdd={addTask}/>
            <h3>List of tasks:</h3>
            {
            tasks.length === 0 && (<p>No tasks yet</p>)}
            {tasks.map(task => (<TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                deadline={task.deadline}
                />))}
        </div>
        //prop onAdd with value addTask is given to TaskForm. Inside TaskForm onAdd() invokes addTask()
        //tasks.length is a conditional rendering (rendering what's after && if the first condition is true)
        //tasks.map - is the JS array method to iterate through the whole array
        // key is a special React attribute used to render a list
    );
}
export default TasksPage;