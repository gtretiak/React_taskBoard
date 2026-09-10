import {
  type WorkerRequest,
  priorityOrder,
  statusOrder,
  SORTTYPE,
  SORTDIR,
} from "../types/commonTypes";

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
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let result = 0;
    switch (sortBy) {
      case SORTTYPE.title:
        result = a.title.localeCompare(b.title);
        break;
      case SORTTYPE.status:
        result = statusOrder[a.status] - statusOrder[b.status];
        break;
      case SORTTYPE.priority:
        result = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case SORTTYPE.createdAt:
        result = a.createdAt.getTime() - b.createdAt.getTime();
        break;
      case SORTTYPE.updatedAt:
        result = a.updatedAt.getTime() - b.updatedAt.getTime();
        break;
    }
    return sortDir === SORTDIR.ascending ? result : -result;
  });
  self.postMessage(sortedTasks);
};
// with self.onmessage the worker receives the data from the main thread and with self.postMessage it sends back the result.
// Worker.postMessage (what to send) -> self.onmessage (what to execute)
// self.postMessage (what to send) -> Worker.onmessage (what to execute)
// messageEvent is created by the browser and contains the message that was sent (that has the shape of WorkerRequest). event.data is exactly that
