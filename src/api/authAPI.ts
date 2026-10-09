import type { AuthResponse } from "../types/responsesTypes";
import type {
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
} from "../types/requestsTypes";
import { apiRequest } from "./clientAPI";

// async means UI is not locked while API function is being performed and until a response to a request doesn't come 
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
// JSON.stringify is serialization JSON into a string
// JSON.parse is parsing a string back to a JSON object

export async function registerAPI(data: RegisterRequest): Promise<void> {
  await apiRequest("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function changePasswordAPI(
  data: ChangePasswordRequest,
): Promise<void> {
  await apiRequest("/auth/password", {
    method: "PATCH",
    auth: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
