"use client";

import LogoutBtn from "@/shared/Logout";
import ProfileCardSkeleton from "@/shared/skeletons/ProfileCardSkeleton";
import { User } from "@/shared/types/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfileCard() {
    const { id } = useParams();
    const { data: session } = useSession();

    const [user, setUser] = useState<User | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const { data, isLoading } = useSWR(`/api/user/profile/${id}`, fetcher, {
        refreshInterval: 5000,
    });

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data]);

    if (isLoading) {
        return <ProfileCardSkeleton />;
    }

    // if (error) {
    // 	return <div>Произошла ошибка: {error}</div>
    // }

    const isMyProfile = session?.user?.id === user?.id;

    const handleAvatarUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files?.[0]) return;

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("avatar", file);

        setUploading(true);
        try {
            const res = await fetch("/api/user/avatar", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setUser((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    profile: { ...prev.profile, avatar: data.avatarUrl },
                };
            });
        } catch (err) {
            console.error("Ошибка загрузки аватара", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full sm:py-6 py-4 sm:px-8 px-4 rounded-2xl flex flex-col justify-between
			shadow-sm text-gray-950 border-[1px] border-gray-300 bg-gray-50 gap-y-4"
            >
                <div className="h-[10%]">
                    <p className="text-4xl text-end font-bold text-gray-900">
                        {user?.name}
                    </p>
                </div>
                <div className="relative group flex justify-center items-center w-full h-[50%]">
                    {isMyProfile && (
                        <label
                            className="absolute right-[25%] top-[25%] z-10 cursor-pointer 
                         transition-all ease-in-out duration-300 scale-[50%] transform opacity-0
                         group-hover:top-[3%] group-hover:right-[3%] group-hover:scale-[100%] group-hover:opacity-100
                        "
                        >
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarUpload}
                                disabled={uploading}
                            />
                            <div
                                className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-gray-950  
                         transition-all ease duration-200 opacity-0 group-hover:opacity-100  hover:bg-gray-800 z-0
                       "
                            >
                                <Image
                                    src="/change-avatar.svg"
                                    width={40}
                                    height={40}
                                    alt="Изменить"
                                ></Image>
                            </div>
                        </label>
                    )}

                    <div className="z-10 bg-gray-50 overflow-hidden rounded-full sm:h-[250px] sm:w-[250px] h-[250px] w-[250px] relative group z-2 border-2 border-gray-300 ">
                        <Image
                            //подлючить аватар из бд
                            src={user?.profile.avatar || "/user-profile.svg"}
                            alt="user"
                            fill
                            objectFit="cover"
                            draggable={false}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-y-5 h-[30%] justify-between">
                    <div className="flex flex-col gap-y-2">
                        <div className="flex justify-between items-center">
                            <h4 className="text-gray-700 text-2xl font-light ">
                                Обо мне:
                            </h4>
                            {isMyProfile && (
                                <button
                                    className="text-gray-400 text-sm hover:underline"
                                    onClick={() => {
                                        setEditing(!editing);
                                    }}
                                >
                                    {editing ? "Сохранить" : "Редактировать"}
                                </button>
                            )}
                        </div>
                        <div className="h-[81px]">
                            {editing ? (
                                <motion.textarea
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    placeholder={user?.profile.bio}
                                    maxLength={100}
                                    className=" w-[300px] h-[80px] outline-none rounded-md bg-gray-100 border-[1px]
							 border-gray-300 focus:border-gray-400 px-2 resize-none text-base text-gray-700 "
                                ></motion.textarea>
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-lg text-gray-700 w-[300px] h-[80px] whitespace-normal break-words"
                                >
                                    {user?.profile.bio}{" "}
                                </motion.p>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className="flex justify-between items-center">
                            <span className="text-gray-700 text-xl font-light ">
                                Дата регистрации:
                            </span>{" "}
                            <span className="text-gray-900 text-lg font-medium">
                                {user?.createdAt
                                    ? new Date(
                                          user.createdAt
                                      ).toLocaleDateString()
                                    : "Неизвестно"}
                            </span>
                        </p>
                    </div>
                </div>
            </motion.div>
            {isMyProfile && (
                <div className="mt-4 space-y-4">
                    <motion.div
                        initial={{ x: -25, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="shadow-sm text-gray-700 border-[1px] border-gray-300 text-lg font-light bg-gray-50 rounded-2xl p-4 pl-6 flex justify-between"
                    >
                        Ваш email:{" "}
                        <span className="text-end">{user?.email}</span>
                    </motion.div>
                    <motion.div
                        initial={{ x: -25, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <LogoutBtn />
                    </motion.div>
                </div>
            )}
        </>
    );
}
