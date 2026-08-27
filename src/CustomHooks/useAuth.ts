import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth error: shouldn't be used outside Provider");
  return context;
}
