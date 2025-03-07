"use client";
import { Goal } from "@/shared/types/goal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface GoalCardProps {
    goal: Goal;
}

export default function UserMini({ goal }: GoalCardProps) {
    const { data } = useSession();

    return (
        <Link
            href={`/profile/${goal.userId}`}
            className=" flex items-center justify-center gap-x-4 sm:mb-0 mb-2 "
        >
            <p className="text-xl font-bold">
                {data?.user.name === goal.user.name ? "Вы" : goal.user.name}
            </p>

            <div className=" w-[35px] h-[35px] overflow-hidden rounded-full flex items-center justify-center relative ">
                <Image
                    alt="user"
                    src={
                        goal.user.profile.avatar
                            ? goal.user.profile.avatar
                            : "/user-profile.svg"
                    }
                    className="w-full h-full top-0 left-0 object-cover "
                    fill
                    objectFit="cover"
                    draggable={false}
                />
            </div>
        </Link>
    );
}
