"use client";

import { Skeleton } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function AuthWidget() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex gap-x-2 h-[40px] items-center">
                <Skeleton
                    variant="circular"
                    width={35}
                    height={35}
                    sx={{ bgcolor: "#d1d5db" }}
                    animation={"pulse"}
                />
            </div>
        );
    }

    if (status === "authenticated") {
        return (
            <div className=" w-fit h-[35px]  rounded-3xl  ">
                <Link
                    href="/profile/me"
                    className=" flex items-center justify-center gap-x-5"
                >
                    <div className=" w-[35px] h-[35px] overflow-hidden rounded-full flex items-center justify-center relative ">
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
                    className="px-4 py-2 bg-gray-950  text-gray-50 rounded-xl "
                >
                    Регистрация
                </Link>
            </div>
            <div>
                <Link
                    href="/login"
                    className="border-[1px] border-gray-500 px-4 py-2 rounded-xl text-gray-950 bg-gray-100 hover:bg-gray-200 "
                >
                    Вход
                </Link>
            </div>
        </div>
    );
}
