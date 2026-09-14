import { useAuthStore } from "../Store/authStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  type RegisterFormData,
} from "../ZodSchemas/authSchema";
import toast from "react-hot-toast";

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
    const { confirmation, ...CleanData } = data;
    const success = await registerUser(CleanData);
    if (!success) {
      setError("nickname", {
        type: "server",
        message: "This nickname is already taken",
      });
      toast.error("Registration failed");
      return;
    }
    toast.success("Registration success!");
    navigate("/login");
  }

  return (
    <div>
      <h1>Welcome, new user!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nickname">User: </label>
          <input type="text" id="nickname" {...register("nickname")} />
          {errors.nickname && (
            <p className="field-error">{errors.nickname.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <p className="field-error">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmation">Confirm password: </label>
          <input
            type="password"
            id="confirmation"
            {...register("confirmation")}
          />
          {errors.confirmation && (
            <p className="field-error">{errors.confirmation.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email [optional]: </label>
          <input
            type="email"
            id="email"
            placeholder="email@provider.domen"
            {...register("email")}
          />
          {errors.email && (
            <p className="field-error">{errors.email.message}</p>
          )}
        </div>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
