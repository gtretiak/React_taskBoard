import { useState, useRef, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import TaskDialog from "../components/TaskDialog";
import TaskSkeleton from "../components/TaskSkeleton";
import DeleteDialog from "../components/DeleteDialog";
import { useTaskStore } from "../Store/taskStore";
import { useDebouncedValue } from "../CustomHooks/useDeobouncedValue";
import type { Task } from "../types/responsesTypes";
import {
  SORTTYPE,
  SORTDIR,
  type SortingType,
  type SortingDir,
} from "../types/commonTypes";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

function DashboardPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);
  const error = useTaskStore((state) => state.error);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortingType>(SORTTYPE.title);
  const [sortDir, setSortDir] = useState<SortingDir>(SORTDIR.ascending);
  const [isCreateDialog, setIsCreateDialog] = useState(false);
  const [newTaskId, setNewTaskId] = useState<string | null>(null);
  const [showToTop, setShowToTop] = useState(false);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const deletingTaskId = useTaskStore((state) => state.deletingTaskId);
  const debounced = useDebouncedValue(search, 300);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filtering, setFiltering] = useState(true);
  const workerRef = useRef<Worker | null>(null);
  // reference to the Worker object that persists for the lifetime of the component and its changes don't trigger renders.

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../Workers/taskWorker.ts", import.meta.url),
      { type: "module" },
    );
    workerRef.current.onmessage = (event: MessageEvent<Task[]>) => {
      setFilteredTasks(event.data);
      setFiltering(false);
      // putting the filtered array into React state
    };
    return () => {
      workerRef.current?.terminate(); // runs on unmounting
    };
  }, []);
  // this effect runs when the component mounts, creats the Worker, sets up its message listener and cleans it up when the component unmounts. It's about receiving the filtered result

  useEffect(() => {
    setFiltering(true);
    workerRef.current?.postMessage({
      tasks,
      search: debounced,
      sortBy,
      sortDir,
    });
  }, [tasks, debounced, sortBy, sortDir]);
  // this effect is about sending work to the Worker

  useEffect(() => {
    if (!newTaskId) return;
    const element = document.getElementById(`task-${newTaskId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const timer = setTimeout(() => {
      setNewTaskId(null);
    }, 1800);
    return () => clearTimeout(timer);
  }, [filteredTasks, newTaskId]);

  useEffect(() => {
    function handleScroll() {
      setShowToTop(window.scrollY > 200);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard page!</h1>
      <section className="toolbar">
        <div className="task-actions">
          <button
            type="button"
            className="create-task-button"
            onClick={() => setIsCreateDialog(true)}
          >
            Create new task
          </button>
          <TaskDialog
            open={isCreateDialog}
            title="Let's create a new task"
            onCancel={() => setIsCreateDialog(false)}
          >
            <TaskForm
              onSuccess={(taskId) => {
                setNewTaskId(taskId);
                setIsCreateDialog(false);
              }}
              onCancel={() => setIsCreateDialog(false)}
            ></TaskForm>
          </TaskDialog>
          <div className="task-filters">
            <div className="form-group-inline">
              <label htmlFor="search">Search: </label>
              <input
                type="text"
                id="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="form-group-inline">
              <label htmlFor="sortBy">Sort by: </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortingType)
                }
              >
                <option value={SORTTYPE.title}>Title</option>
                <option value={SORTTYPE.status}>Status</option>
                <option value={SORTTYPE.priority}>Priority</option>
                <option value={SORTTYPE.createdAt}>Creation Date</option>
                <option value={SORTTYPE.updatedAt}>Last update</option>
              </select>
            </div>

            <div className="form-group-inline">
              <label htmlFor="order">Order: </label>
              <select
                id="order"
                value={sortDir}
                onChange={(event) =>
                  setSortDir(event.target.value as SortingDir)
                }
              >
                <option value={SORTDIR.ascending}>Ascending</option>
                <option value={SORTDIR.descending}>Descending</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="task-list">
        {loading && <TaskSkeleton />}
        {!loading && !filtering && error && (
          <div className="task-error">
            <p>{error}</p>
            <button className="button" onClick={fetchTasks}>
              Retry
            </button>
          </div>
        )}
        {!loading && !error && filtering && <TaskSkeleton />}
        {!loading && !filtering && !error && filteredTasks.length === 0 && (
          <p>No task found :(</p>
        )}
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              id={`task-${task.id}`}
              className={task.id === newTaskId ? "new-task-wrapper" : ""}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: [1, 1, 0],
                scaleY: [1, 0.08, 0],
                scaleX: [1, 1, 0],
              }}
              transition={{
                duration: 0.45,
                times: [0, 0.65, 1],
                ease: "easeInOut",
              }}
            >
              <TaskCard task={task} onDelete={setTaskToDelete} />
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      <DeleteDialog
        open={taskToDelete !== null}
        taskTitle={taskToDelete?.title ?? ""}
        deleting={taskToDelete !== null && deletingTaskId === taskToDelete.id}
        onCancel={() => {
          if (deletingTaskId === null) setTaskToDelete(null);
        }}
        onConfirm={async () => {
          if (!taskToDelete) return;
          try {
            await deleteTask(taskToDelete.id);
            toast.success("Task deleted successfully!");
            setTaskToDelete(null);
          } catch (error) {
            toast.error(
              "The task seems to be removed by admin. Refresh the page, please",
            );
          }
        }}
      />

      <AnimatePresence>
        {showToTop && (
          <motion.button
            type="button"
            className="toTop"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            Up ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
export default DashboardPage;
