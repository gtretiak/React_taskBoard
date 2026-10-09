import type { UserPicker } from "../types/responsesTypes";
import { apiRequest } from "./clientAPI";

export async function getUsersAPI(): Promise<UserPicker[]> {
  const response = await apiRequest("/users", {
    auth: true,
  });
  return response.json();
} // GET /users
