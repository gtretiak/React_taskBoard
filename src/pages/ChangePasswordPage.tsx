import { useAuthStore } from "../Store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type changePasswordFormData,
  changePasswordSchema,
} from "../ZodSchemas/authSchema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

function ChangePasswordPage() {
  const changePassword = useAuthStore((state) => state.changePassword);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  }); // creating a form instance

  async function onSubmit(data: changePasswordFormData) {
    const success = await changePassword({
      currentPassword: data.current,
      newPassword: data.new,
    });
    if (success) {
      toast.success("Password changed successfully. Please log in again.");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1200);
    } else toast.error("Invalid credentials! You got logged out");
  }

  return (
    <section>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="current">Current password: </label>
          <input type="password" id="current" {...register("current")} />
          {errors.current && (
            <p className="field-error">{errors.current.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="new">New password: </label>
          <input type="password" id="new" {...register("new")} />
          {errors.new && <p className="field-error">{errors.new.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmation">Repeat password: </label>
          <input
            type="password"
            id="confirmation"
            {...register("confirmation")}
          />
          {errors.confirmation && (
            <p className="field-error">{errors.confirmation.message}</p>
          )}
        </div>

        <button className="button" type="submit" disabled={loading}>
          {loading ? "Updating password..." : "Change password"}
        </button>
      </form>
    </section>
  );
}

export default ChangePasswordPage;
