import { useAuthStore } from "../Store/authStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  type RegisterFormData,
} from "../ZodSchemas/authSchema";

function RegisterPage() {
  const registerUser = useAuthStore((store) => store.register);
  const loading = useAuthStore((store) => store.loading);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(RegisterSchema) }); // creating a form instance

  async function onSubmit(data: RegisterFormData) {
    const success = await registerUser(data);
    if (!success) {
      setError("nickname", {
        type: "server",
        message: "This nickname is already taken",
      });
      return;
    }
    navigate("/login");
  }

  return (
    <div>
      <h1>Welcome, new user!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nickname">User: </label>
        <input type="text" id="nickname" {...register("nickname")} />
        {errors.nickname && <p>{errors.nickname.message}</p>}
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        <label htmlFor="email">Email [optional]: </label>
        <input
          type="email"
          id="email"
          placeholder="email@provider.domen"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
