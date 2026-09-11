import { useAuthStore } from "../Store/authStore";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
// reading the environment variable baseUrl
const AUTH_KEY = "accessToken";

interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
} // extending any incoming HTTP request by adding auth which is a flag of whether a route requires logged-in user or not

export async function apiRequest(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<Response> {
  const token = localStorage.getItem(AUTH_KEY);
  const headers = new Headers(options?.headers);
  if (options?.auth && token) {
    headers.set("Authorization", `Bearer ${token}`);
  } // injecting the token to the auth header
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  }); // including Authorization header
  if (!response.ok) {
    if (response.status === 401) useAuthStore.getState().invalidateSession(); // 401 - token expired, fake or corrupted, so the expired session data gets removed
    const error = await response.json();
    throw new Error(`API Error: ${response.status}: ${error.message}`);
  }
  return response;
}
// Response is a built-in type that fetch() returns
// RequestInit is what it takes as a parameter
