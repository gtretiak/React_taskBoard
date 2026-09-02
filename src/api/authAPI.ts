import type { AuthResponse } from "../types/responsesTypes";
import type { LoginRequest, RegisterRequest } from "../types/requestsTypes";
import { apiRequest } from "./clientAPI";

export async function loginAPI(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiRequest("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function registerAPI(data: RegisterRequest): Promise<void> {
  await apiRequest("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
