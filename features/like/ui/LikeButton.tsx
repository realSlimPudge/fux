"use client";

import { Goal } from "@/shared/types/goal";
import { Button } from "@mui/material";
import { startTransition, useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useSession } from "next-auth/react";

type LikeInterface = {
    goal: Goal;
};

export default function LikeButton({ goal }: LikeInterface) {
    const { status } = useSession();

    // Инициализируем локальные состояния значениями из goal
    const [isLiked, setIsLiked] = useState<boolean>(goal.isLiked);
    const [likeCount, setLikeCount] = useState<number>(goal._count.likes);
    const [support, setSupport] = useState<string>("");

    const toggleLike = async () => {
        // Сохраняем текущее состояние для возможного отката
        const previousLiked = isLiked;
        const delta = previousLiked ? -1 : 1;

        // Оптимистично обновляем состояние
        startTransition(() => {
            setIsLiked(!previousLiked);
            setLikeCount((prev) => prev + delta);
        });

        try {
            const res = await fetch("/api/goals/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ goalId: goal.id }),
            });
            if (!res.ok) {
                // Если сервер вернул ошибку, откатываем изменения
                startTransition(() => {
                    setIsLiked(previousLiked);
                    setLikeCount((prev) => prev - delta);
                });
                console.error("Failed to like goal:", await res.json());
            }
        } catch (error) {
            // При ошибке сети также откатываем изменения
            startTransition(() => {
                setIsLiked(previousLiked);
                setLikeCount((prev) => prev - delta);
            });
            console.error("Request failed", error);
        }
    };

    function getSupport() {
        if (likeCount === 0) {
            setSupport("Поддержек");
        } else if (likeCount === 1) {
            setSupport("Поддержка");
        } else if (likeCount > 1 && likeCount < 5) {
            setSupport("Поддержки");
        } else {
            setSupport("Поддержек");
        }
    }

    useEffect(() => {
        getSupport();
    });

    return (
        <Button
            onClick={toggleLike}
            sx={{
                padding: "0.25rem 1.75rem",
                borderRadius: "0.75rem",
                border: "1px #030712 solid",
                color: "black",
                display: "flex",
                alignItems: "center",
                transition: "300ms ease all",
            }}
            startIcon={isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
            variant="outlined"
            disabled={status === "unauthenticated"}
            className={
                isLiked ? "bg-gray-950 text-white" : "bg-gray-300 text-black"
            }
        >
            <span className="mt-1">
                {likeCount} {support}
            </span>
        </Button>
    );
}
