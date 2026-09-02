import { useAuthStore } from "../Store/authStore";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const register = useAuthStore((store) => store.register);
  const loading = useAuthStore((store) => store.loading);
  const error = useAuthStore((store) => store.error);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const success = await register({
      nickname,
      password,
      email: email || undefined,
    });
    if (success) navigate("/login");
  }
  // || means null, undefined, false, 0, ""
  return (
    <div>
      <h1>Welcome, new user!</h1>
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
        <label htmlFor="email">Email [optional]: </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="email@provider.domen"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
