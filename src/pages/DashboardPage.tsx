import { useState, useMemo, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useTaskStore } from "../Store/taskStore";
import { useDebouncedValue } from "../CustomHooks/useDeobouncedValue";

function DashboardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);
  const error = useTaskStore((state) => state.error);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const [search, setSearch] = useState("");
  const debounced = useDebouncedValue(search, 300);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(debounced.toLowerCase()),
    );
  }, [tasks, debounced]);
  return (
    <div>
      <h1>Welcome to the Dashboard page!</h1>
      {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      <TaskForm />
      <label htmlFor="search" className="task-search"></label>
      <input
        type="text"
        id="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search task..."
      />
      <section className="task-list">
        {!loading && filteredTasks.length === 0 && <p>No task found :(</p>}
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>
    </div>
  );
}
export default DashboardPage;
