"use client";

import { Goal } from "@/shared/types/goal";
import { useState } from "react";

type LikeInterface = {
    goal: Goal;
};

export default function LikeButton({ goal }: LikeInterface) {
    const [isLiked, setIsLiked] = useState(goal.isLiked);
    const [likeCount, setLikeCount] = useState(goal._count.likes);
    const toggleLike = async () => {
        const res = await fetch("api/goals/like", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ goalId: goal.id }),
        });
        if (!res.ok) {
            console.error("Failed ot like goal", await res.json());
            return;
        }
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };
    return (
        <button
            onClick={toggleLike}
            className={`' py-2 px-4 rounded-xl border-[1px] 
            border-gray-950 bg-gray-300 text-gray-950 
            transition-all ease duration-300
            ' ${isLiked && "bg-gray-950 text-white "} `}
        >
            Лайк {likeCount}
        </button>
    );
}
