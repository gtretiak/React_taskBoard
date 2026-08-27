/*
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
*/

import { useEffect, useState } from "react";
import { type DraftTaskL3 } from "../types/types";

const STORAGE_KEY = "tasks"; // name in localStorage
function readTasks(): DraftTaskL3[] {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  if (!storedTasks) return [];
  return JSON.parse(storedTasks); // parsing a JSON string to JS object, because React needs JS
}

export function useLocalTasks() {
  const [tasks, setTasks] = useState<DraftTaskL3[]>(readTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); // converting JS object into JSON text
  }, [tasks]);

  function createTask(title: string) {
    const newTask: DraftTaskL3 = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function updateTask(id: string, completed: boolean) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed } : task)),
    ); // task is a parameter name to use map, might be item or whatever
  }

  function deleteTask(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // reversed filtering logic
  }

  return { tasks, createTask, updateTask, deleteTask };
}

// <TaskForm onAdd={addTask} />
