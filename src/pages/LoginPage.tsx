import { useAuth } from "../CustomHooks/useAuth";
import { useState, type SubmitEvent } from "react";

function LoginPage() {
  const Auth = useAuth();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await Auth.login(nickname, password);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h1>Welcome!</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginPage;
