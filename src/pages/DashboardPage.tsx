import { useState, useMemo } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useLocalTasks } from "../CustomHooks/useLocalTasks";
import { useDebouncedValue } from "../CustomHooks/useDeobouncedValue";

function DashboardPage() {
  const [search, setSearch] = useState("");
  const debounced = useDebouncedValue(search, 300);
  const { tasks, createTask, updateTask, deleteTask } = useLocalTasks();
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(debounced.toLowerCase()),
    );
  }, [tasks, debounced]);

  return (
    <div>
      <h1>Welcome to the Dashboard page!</h1>
      <TaskForm onAdd={createTask} />
      <label htmlFor="search" className="task-search"></label>
      <input
        type="text"
        id="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search task..."
      />
      <section className="task-list">
        {filteredTasks.length === 0 && <p>No task found :(</p>}
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </section>
    </div>
  );
}
export default DashboardPage;
