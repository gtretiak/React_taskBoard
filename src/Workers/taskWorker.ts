import {
  type WorkerRequest,
  priorityOrder,
  statusOrder,
  SORTTYPE,
  SORTDIR,
} from "../types/commonTypes";
import type { Task } from "../types/responsesTypes";

const sortingMap: Record<string, (a: Task, b: Task) => number> = {
  [SORTTYPE.title]: (a, b) => a.title.localeCompare(b.title), // ascii comparisson
  [SORTTYPE.status]: (a, b) => statusOrder[a.status] - statusOrder[b.status], // with order it sorts logically instead of alphabetically
  [SORTTYPE.priority]: (a, b) =>
    priorityOrder[a.priority] - priorityOrder[b.priority],
  [SORTTYPE.createdAt]: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(), // getTime converts Date into a milliseconds
  [SORTTYPE.updatedAt]: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
}; // Using built-in Record type we create a map where every key is a string representing the sorting type with its respective function, returning a number and representing the way the tasks should be sorted

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const { tasks, search, sortBy, sortDir } = event.data;
  const normalizedSearch = search.toLowerCase();
  const filteredTasks = tasks.filter((task) => {
    const searchableText = [
      task.title,
      task.description,
      task.status,
      task.priority,
      task.visibility,
      task.assignmentStatus,
      task.creator.nickname,
      task.assignee?.nickname,
      task.createdAt,
      task.updatedAt,
      task.tags.map((tag) => tag.name),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return searchableText.includes(normalizedSearch);
  }); // boolean removes null, undefined and empty strings
  const compare = sortingMap[sortBy] || (() => 0); // using a key coming from a user we find a function to sort tasks OR 0 if sortBy is undefined
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const result = compare(a, b);
    return sortDir === SORTDIR.ascending ? result : -result;
  });
  self.postMessage(sortedTasks);
};
// with self.onmessage the worker listens for React app (main thread) to send data and with self.postMessage it sends back the result.
// Worker.postMessage (what to send) -> self.onmessage (what to execute)
// self.postMessage (what to send) -> Worker.onmessage (what to execute)
// messageEvent is created by the browser and contains the message that was sent (that has the shape of WorkerRequest). event.data is exactly that
