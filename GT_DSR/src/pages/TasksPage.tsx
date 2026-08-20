import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useEffect, useState, useMemo, useCallback } from "react"; // useState()
import type { TaskStatus, DraftTask } from "../types/types"

const mockTasks:DraftTask[] = Array.from({length:100}, (_, index) => ({
        id: `${index + 1}`,
        status: "TODO",
        deadline: "2026-09-18",
        title: `Task ${index + 1}`,
    }));
    // to make big list of tasks Array.from method is used (to be removed later), where (_, index) is a callback with a current value (what exactly - we don't care, hence '_') and its position
    // ANTI-PATTERN FIX 2: moved mockTasks from TasksPage() to avoid creating the array everytime TasksPage is rendered. Instead it gets created only when the module is loaded.

function TasksPage() {
    const [tasks, setTasks] = useState<DraftTask[]>(mockTasks);
    // state contains an array of Task objects, either mockTasks or empty (change it later)
    const [search, setSearch] = useState("");
    // search is what the user is typing now
    const [debounced, setDebounced] = useState("");
    // debounced is what we up to (after pause)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);
    // useEffect runs if 'search' gets changed, namely after 300 it builds 'debounced' from 'search', timer gets cleared to start 0-300 every pause and not overlap.
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => task.title.toLowerCase().includes(debounced.toLowerCase()));
    }, [tasks, debounced]);
    // filter includes means contains anywhere
    // + startsWith, endsWith, title === search (exact match)
    // we can also search by status
    // ANTI-PATTERN FIX 1: useMemo helps avoiding unnecessary filtering every time the component renders if neither tasks nor debounced changed
    const addTask = useCallback((title:string, status:TaskStatus,       deadline:string) => {
        const newTask:DraftTask = {
        id:crypto.randomUUID(),
        title:title,
        status:status,
        deadline:deadline,
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
        },[]);
    // using given parameters and generated random UUID, it creates a new Task
    // ... is a spread operator, takes the contents of tasks, adds new Task and puts all them into a new array
    // ANTI-PATTERN FIX 4?: useCallback() keeps the same function between renders (not recreating identical yet different function object from the inside TasksPage() on every task creation), therefore we need a functional state update, meaning if tasks array has been changed, the function should refer to an updated array 
    return (
        <div>
            <h1>Tasks page</h1>
            <TaskForm onAdd={addTask}/>
            <h2>List of tasks:</h2>
            <div className="task-search">
                <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search task..."/>
            </div>
            <div className="task-list">
                {
                filteredTasks.length === 0 && (<p>No tasks found</p>)}
                {filteredTasks.map(task => (<TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                deadline={task.deadline}
                />))}
            </div>
        </div>
        //prop onAdd with value addTask is given to TaskForm. Inside TaskForm onAdd() invokes addTask()
        //input
        //tasks.length is a conditional rendering (rendering what's after && if the first condition is true)
        //tasks.map - is the JS array method to iterate through the whole array
        // key is a special React attribute used to render a list
    );
}
export default TasksPage;