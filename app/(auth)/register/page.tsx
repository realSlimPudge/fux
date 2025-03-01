"use client";

import PageContainer from "@/shared/PageContainer";
import { registerSchema } from "@/shared/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { z } from "zod";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const { register, handleSubmit, formState, setError } =
        useForm<RegisterFormData>({
            resolver: zodResolver(registerSchema),
        });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Ошибка регистрации");
            }

            await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: true,
                callbackUrl: "/profile/me",
            });
        } catch (error: unknown) {
            if (error instanceof Error && error.message.includes("email")) {
                setError("email", {
                    type: "manual",
                    message: error.message,
                });
            } else {
                setError("root", {
                    type: "manual",
                    message:
                        error instanceof Error
                            ? error.message
                            : "Ошибка регистрации. Попробуйте позже",
                });
            }
        }
    };

    return (
        <PageContainer>
            <motion.div
                className="w-[25%] h-fit border-[1px] bg-gray-950 border-gray-700 mx-auto p-6 rounded-2xl flex flex-col justify-around gap-y-6"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
            >
                <h1 className="text-center text-4xl font-bold">Регистрация</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-between h-fit w-[90%] mx-auto gap-y-5"
                >
                    <div className="flex flex-col w-full gap-y-2">
                        <label className="text-xl ml-2">Имя</label>
                        <input
                            {...register("name")}
                            className="bg-transparent p-4 rounded-lg border-[1px] border-gray-700 text-xl outline-none"
                        />
                        {formState.errors.name && (
                            <p>{formState.errors.name.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col w-full gap-y-2">
                        <label className="text-xl ml-2">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="bg-transparent p-4 rounded-lg border-[1px] border-gray-700 text-xl outline-none"
                        />
                        {formState.errors.email && (
                            <p>{formState.errors.email.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col w-full gap-y-2">
                        <label className="text-xl ml-2">Пароль</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="bg-transparent p-4 rounded-lg border-[1px] border-gray-700 text-xl outline-none"
                        />
                        {formState.errors.password && (
                            <p>{formState.errors.password.message}</p>
                        )}
                    </div>
                    {formState.errors.root && (
                        <p>{formState.errors.root.message}</p>
                    )}
                    <button
                        type="submit"
                        disabled={formState.isSubmitting}
                        className="bg-white text-black px-4 py-3 w-fit transition-all ease duration-300 mt-5 rounded-xl text-xl font-semibold"
                    >
                        {formState.isSubmitting
                            ? "Регистрация..."
                            : "Зарегистрироваться"}
                    </button>
                </form>
                <div className="text-center">
                    <p>
                        Уже есть аккаунт? <Link href="/login">Войти</Link>
                    </p>
                </div>
            </motion.div>
        </PageContainer>
    );
}
