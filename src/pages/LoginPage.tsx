import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../ZodSchemas/authSchema";
import toast from "react-hot-toast";

function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) }); // creating a form instance

  async function onSubmit(data: LoginFormData) {
    const success = await login(data);
    if (!success) {
      setError("password", {
        type: "server",
        message: "Invalid nickname or password",
      });
      toast.error("Invalid nickname or password");
      return;
    }
    toast.success("Welcome back!");
    navigate("/tasks");
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nickname">User: </label>
        <input type="text" id="nickname" {...register("nickname")} />
        {errors.nickname && (
          <p className="field-error">{errors.nickname.message}</p>
        )}
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && (
          <p className="field-error">{errors.password.message}</p>
        )}
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
