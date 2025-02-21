"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function AuthWidget() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex gap-x-2 h-[40px] items-center">
                <div>
                    <Link
                        href="/register"
                        className="px-4 py-2 bg-white  text-black rounded-xl border-[1px] border-white"
                    >
                        Регистрация
                    </Link>
                </div>
                <div>
                    <Link
                        href="/login"
                        className="border-[1px] border-gray-400 px-4 py-2 rounded-xl"
                    >
                        Вход
                    </Link>
                </div>
            </div>
        );
    }

    if (session && session.user) {
        return (
            <div className=" w-fit h-[35px]  rounded-3xl  ">
                <Link
                    href="/profile/me"
                    className=" flex items-center justify-center gap-x-5"
                >
                    <div className=" w-[35px] h-[35px] overflow-hidden rounded-full flex items-center justify-center relative bg-white">
                        <Image
                            alt="user"
                            src={`${
                                session.user.image !== null
                                    ? session.user.image
                                    : "/user-profile.svg"
                            }`}
                            className="w-full h-full top-0 left-0 object-cover "
                            fill
                            objectFit="cover"
                            draggable={false}
                        />
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex gap-x-2 h-[40px] items-center">
            <div>
                <Link
                    href="/register"
                    className="px-4 py-2 bg-white  text-black rounded-xl border-[1px] border-white"
                >
                    Регистрация
                </Link>
            </div>
            <div>
                <Link
                    href="/login"
                    className="border-[1px] border-gray-400 px-4 py-2 rounded-xl"
                >
                    Вход
                </Link>
            </div>
        </div>
    );
}
