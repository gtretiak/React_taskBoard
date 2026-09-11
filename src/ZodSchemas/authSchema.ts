import { z } from "zod";

export const loginSchema = z.object({
  nickname: z.string().min(1, "Nickname is required"),
  password: z.string().min(1, "Password is required"),
}); // expecting the object

export type LoginFormData = z.infer<typeof loginSchema>;
// getting a type from zod schema

export const RegisterSchema = z.object({
  nickname: z
    .string()
    .min(3, "Minimum length 3 characters")
    .max(24, "Too big name (24 characters max)")
    .regex(/^[a-z0-9_]+$/, "Only lowercase, digits and underscore are allowed"),
  password: z.string().min(8, "Password must be 8+ characters"),
  email: z.email("Invalid email address").optional().or(z.literal("")),
}); // expecting the object

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const changePasswordSchema = z
  .object({
    current: z.string().min(8, "Current password (8+ characters) is required"),
    new: z.string().min(8, "New password (8+ characters) is required"),
    confirmation: z.string().min(8, "Please confirm the new password"),
  })
  .refine((data) => data.new === data.confirmation, {
    message: "Passwords do not match",
    path: ["confirmation"],
  });
// refine allows to evaluate the whole object after validating each field separately, path is where it should display the error
export type changePasswordFormData = z.infer<typeof changePasswordSchema>; // extracting the structure and converting it into an interface type to be used from components
