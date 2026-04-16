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
import { CircularProgress } from "@mui/material";

type ProfileCardProps = {
  setError: (error: string) => void;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Произошла ошибка");
  }
  return res.json();
};

export default function ProfileCard({ setError }: ProfileCardProps) {
  const { id } = useParams();
  const { data: session } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const [editing, setEditing] = useState<boolean>(false);
  const [prevBio, setPrevBio] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [bioUploading, setBioUploading] = useState<boolean>(false);

  const { data, isLoading, error } = useSWR(
    `/api/user/profile/${id}`,
    fetcher,
    {
      refreshInterval: 5000,
      errorRetryInterval: 15000,
      errorRetryCount: 2,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  useEffect(() => {
    if (data) {
      setUser(data);
      setPrevBio(data.profile.bio);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error]);

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  const isMyProfile = session?.user?.id === user?.id;

  //Смена аватарки
  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
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

  //Смена описания
  const handleBioChange = async () => {
    try {
      setBioUploading(true);
      const res = await fetch(`/api/user/bio/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio: newBio }),
      });
      if (!res.ok) {
        throw new Error("Ошибка при изменении биографии");
      }
    } catch (error) {
      console.error("Ошибка при изменении биографии", error);
    } finally {
      setBioUploading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-y-4 justify-between py-4 px-4 w-full h-full bg-gray-50 rounded-2xl border-gray-300 shadow-sm sm:py-6 sm:px-8 text-gray-950 border-[1px]"
      >
        <div className="h-[10%]">
          <p className="text-4xl font-bold text-gray-900 text-end">
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
              <div className="flex z-0 justify-center items-center rounded-full opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-gray-800 w-[60px] h-[60px] bg-gray-950 ease">
                <Image
                  src="/change-avatar.svg"
                  width={40}
                  height={40}
                  alt="Изменить"
                ></Image>
              </div>
            </label>
          )}

          <div className="overflow-hidden relative z-10 bg-gray-50 rounded-full border-2 border-gray-300 h-[250px] w-[250px] group z-2 sm:h-[250px] sm:w-[250px]">
            {uploading ? (
              <div className="flex justify-center items-center w-full h-full backdrop-brightness-95">
                <CircularProgress
                  sx={{
                    color: "#000000",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </div>
            ) : (
              <Image
                //подлючить аватар из бд
                src={user?.profile.avatar || "/user-profile.svg"}
                alt="user"
                fill
                objectFit="cover"
                draggable={false}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-5 h-[30%] justify-between">
          <div className="flex flex-col gap-y-1">
            <div className="flex justify-between items-center">
              <h4 className="text-2xl font-light text-gray-700">Обо мне:</h4>
              <div className="space-x-2">
                {isMyProfile && (
                  <>
                    {editing && (
                      <button
                        className="text-sm text-gray-400 hover:underline"
                        onClick={() => {
                          setEditing(!editing);
                        }}
                      >
                        Отмена
                      </button>
                    )}

                    <button
                      disabled={bioUploading}
                      className="text-sm text-gray-400 hover:underline"
                      onClick={() => {
                        if (editing) {
                          handleBioChange();
                          setPrevBio(newBio);
                        }
                        setEditing(!editing);
                      }}
                    >
                      {bioUploading
                        ? "Сохранение..."
                        : editing
                          ? "Сохранить"
                          : "Редактировать"}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-1 w-full h-fit">
              <motion.textarea
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                placeholder={user?.profile.bio}
                maxLength={100}
                onInput={(e) => {
                  setNewBio(e.currentTarget.value);
                }}
                disabled={!editing}
                value={editing ? newBio : prevBio}
                className={`m-0 p-2 text-lg w-full h-[130px] border-[1px] box-border hyphens-auto outline-none rounded-md resize-none text-gray-700 ${
                  editing
                    ? "bg-gray-100  border-gray-400"
                    : "bg-transparent border-transparent"
                }`}
              />

              {editing && (
                <motion.div
                  className="flex justify-end text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Осталось символов: {100 - newBio.length}
                </motion.div>
              )}
            </div>
          </div>

          <div className="relative date--before">
            <p className="flex justify-between items-center">
              <span className="text-xl font-light text-gray-700">
                Дата регистрации:
              </span>{" "}
              <span className="text-lg font-medium text-gray-900">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
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
            className="flex justify-between p-4 pl-6 text-lg font-light text-gray-700 bg-gray-50 rounded-2xl border-gray-300 shadow-sm border-[1px]"
          >
            Ваш email: <span className="text-end">{user?.email}</span>
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
