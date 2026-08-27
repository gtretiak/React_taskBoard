import { useAuth } from "../CustomHooks/useAuth";
import { useState, type SubmitEvent } from "react";

function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    login(username, password);
  }
  return (
    <div>
      <h1>Welcome!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginPage;
