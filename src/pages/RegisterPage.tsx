import { useAuth } from "../CustomHooks/useAuth";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { register } = useAuth();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await register(nickname, password, email);
      const navigate = useNavigate();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h1>Welcome, new user!</h1>
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
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="You can leave it empty"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
