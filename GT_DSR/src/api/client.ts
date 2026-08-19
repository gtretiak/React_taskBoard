const baseUrl = import.meta.env.VITE_API_BASE_URL;
// reading the environment variable baseUrl

export async function getTasks() {
    const response = await fetch(`${baseUrl}/tasks`);
    console.log("GET /tasks", response);
    return Promise.resolve([]); // to be replaced
}
export async function createTask() {
    const response = await fetch(`${baseUrl}/tasks`);
    console.log("POST", response);
    return Promise.resolve(null); // to be replaced with await fetch(same URL)
}
export async function deleteTask(id:string) {
    const response = await fetch(`${baseUrl}/tasks/${id}`);
    console.log("DELETE", response);
    return Promise.resolve(null);
}
// to be removed:
getTasks().then(tasks => {
        console.log("Received tasks: ", tasks);
    });
createTask();
deleteTask("12");