import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import { type SubmitEvent, useState } from "react";

function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const success = await login({ nickname, password });
    if (success) navigate("/tasks");
  }
  return (
    <div>
      <h1>Welcome!</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nickname">User: </label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
export default LoginPage;

// disabling button while loading
