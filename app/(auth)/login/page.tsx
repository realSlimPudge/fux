"use client";
//нормально обработать ошибку
import PageContainer from "@/shared/PageContainer";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const result = await signIn("credentials", {
            email,
            password,
            callbackUrl: "/social",
        });

        setIsLoading(false);

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
                className="sm:w-[25%] w-[90%] bg-gray-950 h-fit border-[1px] border-gray-700 mx-auto p-6 rounded-2xl flex flex-col justify-around gap-y-6 "
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
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
                    <div className="flex flex-col w-full gap-y-2 ">
                        <label className="text-xl ml-2">Пароль</label>

                        <div className="relative w-full">
                            <button
                                type="button"
                                onClick={() => setIsVisible(!isVisible)}
                                className="absolute transform translate-x-[-50%] translate-y-[-50%] right-[2%] top-[50%]"
                            >
                                {isVisible ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityIcon />
                                )}
                            </button>
                            {isVisible ? (
                                <input
                                    type="text"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="w-full bg-transparent p-4 rounded-lg border-[1px] border-gray-700 text-xl outline-none"
                                ></input>
                            ) : (
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="w-full bg-transparent p-4 rounded-lg border-[1px] border-gray-700 text-xl outline-none tracking-widest"
                                />
                            )}
                        </div>
                    </div>

                    {!isLoading ? (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-white text-black px-4 py-3 w-[91px] h-[52px] mt-2
                             transition-all ease duration-300 rounded-xl text-xl font-semibold"
                        >
                            Войти
                        </button>
                    ) : (
                        <CircularProgress
                            sx={{ color: "#ffffff", marginTop: "0.5rem" }}
                            size={"52px"}
                        />
                    )}
                </form>
                <div>
                    <p className="text-center sm:block flex flex-col">
                        <span>Нет аккаунта? </span>
                        <Link href="/register" className="hover:underline">
                            <span>Зарегистрироваться</span>
                        </Link>
                    </p>
                </div>
            </motion.div>
        </PageContainer>
    );
}
