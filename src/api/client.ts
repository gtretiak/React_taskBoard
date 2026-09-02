const baseUrl = import.meta.env.VITE_API_BASE_URL;
// reading the environment variable baseUrl

export async function apiRequest(endpoint: string, options?: RequestInit) {
  return fetch(`${baseUrl}${endpoint}`, options);
}

/*
const token = localStorage.getItem(AUTH_KEY);

fetch(..., {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
*/

export async function createTask() {
  const response = await fetch(`${baseUrl}/tasks`);
  console.log("POST", response);
  return Promise.resolve(null); // to be replaced with await fetch(same URL)
}
export async function deleteTask(id: string) {
  const response = await fetch(`${baseUrl}/tasks/${id}`);
  console.log("DELETE", response);
  return Promise.resolve(null);
}
