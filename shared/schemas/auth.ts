import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Имя должно быть минимум 2 символа")
        .max(15, "Имя должно быть короче 15 символов"),
    email: z.string().email("Некорректный email"),
    password: z
        .string()
        .min(6, "Пароль должен быть минимум 6 символов")
        .regex(/[A-Z]/, "Должна быть хотя бы одна заглавная буква"),
});
