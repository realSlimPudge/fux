"use client";

import LogoutBtn from "@/shared/Logout";
import ProfileCardSkeleton from "@/shared/skeletons/ProfileCardSkeleton";
import { User } from "@/shared/types/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileCard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [uploading, setUploading] = useState<boolean>(false);

    const { id } = useParams();
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true);
                const res = await fetch(`/api/user/profile/${id}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error);
                }
                setUser(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [id]);

    if (loading) {
        return <ProfileCardSkeleton />;
    }

    if (error) {
        return <div>Произошла ошибка: {error}</div>;
    }

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
        <div className="bg-gray-50 py-6 px-8 rounded-2xl h-full shadow-sm text-gray-950">
            <div>
                <p className="text-4xl text-end font-bold text-gray-900">
                    {user?.name}
                </p>
            </div>
            <div className="relative group">
                {isMyProfile && (
                    <label className="absolute right-[5%] top-[5%] z-10 cursor-pointer ">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarUpload}
                            disabled={uploading}
                        />
                        <div
                            className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-gray-950 
                        transition-all ease duration-200 opacity-0 group-hover:opacity-100 hover:bg-gray-800
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

                <div className="overflow-hidden rounded-full w-80 h-80 bg-gray-800 relative my-8 group z-2  border-2 border-gray-300 ">
                    <Image
                        //подлючить аватар из бд
                        src={user?.profile.avatar || "/user-profile.svg"}
                        alt="user"
                        className="w-full h-full top-0 left-0 object-cover "
                        fill
                        objectFit="cover"
                        draggable={false}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-y-5">
                <div className="mb-20">
                    <span className="text-gray-700 text-2xl font-light">
                        Обо мне:
                    </span>
                    <p>{user?.profile.bio}</p>
                </div>
                <div>
                    <p className="flex justify-between items-center">
                        <span className="text-gray-700 text-xl font-light">
                            Дата регистрации:
                        </span>{" "}
                        <span className="text-gray-900 text-lg font-medium">
                            {user?.createdAt
                                ? new Date(user.createdAt).toLocaleDateString()
                                : "Неизвестно"}
                        </span>
                    </p>
                </div>
                {isMyProfile && (
                    <div>
                        <p>
                            Ваш email: <span>{user?.email}</span>
                        </p>
                        <LogoutBtn />
                    </div>
                )}
            </div>
        </div>
    );
}
