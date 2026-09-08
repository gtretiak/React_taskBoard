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
