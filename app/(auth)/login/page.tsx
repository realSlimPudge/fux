"use client";
//нормально обработать ошибку
import PageContainer from "@/shared/PageContainer";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/social",
        });

        if (result?.error) {
            setError(result.error);
        }
    };
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <PageContainer>
            <motion.div
                className="w-[25%] bg-gray-950 h-fit border-[1px] border-gray-700 mx-auto p-6 rounded-2xl flex flex-col justify-around gap-y-6 "
                initial={{ y: -20 }}
                animate={{ y: 0 }}
            >
                <h1 className="text-center text-4xl font-bold">Вход</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-between h-fit w-[90%] mx-auto gap-y-5"
                >
                    <div className="flex flex-col w-full gap-y-2">
                        <label className="text-xl ml-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-transparent p-4 rounded-lg border-[1px] border-gray-700 text-xl outline-none"
                        />
                    </div>
                    <div className="flex flex-col w-full gap-y-2">
                        <label className="text-xl ml-2">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-transparent p-4 rounded-lg border-[1px] border-gray-700 text-xl outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-white text-black px-4 py-3 w-fit transition-all ease duration-300 mt-5 rounded-xl text-xl font-semibold"
                    >
                        Войти
                    </button>
                </form>
                <div className="text-center">
                    <p>
                        Нет аккаунта?{" "}
                        <Link href="/register">Зарегистрироваться</Link>
                    </p>
                </div>
            </motion.div>
        </PageContainer>
    );
}
