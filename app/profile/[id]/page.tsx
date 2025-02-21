"use client";
import LogoutBtn from "@/shared/Logout";
import PageContainer from "@/shared/PageContainer";
//вынести карточку профиля в отдельный компонент
//удалять старую аватарку из supabase
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [uploading, setUploading] = useState<boolean>(false);

    const { id } = useParams();
    const { data: session, status } = useSession();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch(`/api/user/profile/${id}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error);
                }
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [id]);

    if (status === "loading" && loading) {
        return <div>Loading...</div>;
    }

    if (error) return <div>Ошибка {error}</div>;

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
            console.log(data);
            if (!res.ok) throw new Error(data.error);

            setUser((prev) => ({
                ...prev,
                profile: { ...prev.profile, avatar: data.avatarUrl },
            }));
        } catch (err) {
            console.error("Ошибка загрузки аватара", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <PageContainer>
            <div className="w-fit mx-auto ">
                <div className="bg-gray-950 py-6 px-8 rounded-2xl">
                    <div>
                        <p className="text-6xl text-center font-bold ">
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
                                <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-gray-700 transition-all ease duration-200 opacity-0 group-hover:opacity-100 hover:bg-gray-600">
                                    <Image
                                        src="/change-avatar.svg"
                                        width={40}
                                        height={40}
                                        alt="Изменить"
                                    ></Image>
                                </div>
                            </label>
                        )}

                        <div className="overflow-hidden rounded-full w-80 h-80 bg-gray-800 relative my-8 group z-2">
                            <Image
                                //подлючить аватар из бд
                                src={
                                    user?.profile.avatar || "/user-profile.svg"
                                }
                                alt="user"
                                className="w-full h-full top-0 left-0 object-cover "
                                fill
                                objectFit="cover"
                                draggable={false}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-5">
                        <div>
                            <span>Обо мне:</span>
                            <p>{user?.profile.bio}</p>
                        </div>
                        <div>
                            <p>
                                Дата регистрации:
                                <span>
                                    {new Date(
                                        user?.createdAt
                                    ).toLocaleDateString()}
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
            </div>
        </PageContainer>
    );
}
