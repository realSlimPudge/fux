"use client";

import { Goal } from "@/shared/types/goal";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import CircularProgress from "@mui/material/CircularProgress";

type LikeInterface = {
    goal: Goal;
};

export default function LikeButton({ goal }: LikeInterface) {
    const { status } = useSession();
    const { mutate } = useSWRConfig();

    const [isLiked, setIsLiked] = useState<boolean>(goal.isLiked);
    const [likeCount, setLikeCount] = useState<number>(goal._count.likes);
    const [support, setSupport] = useState<string>("");
    const [isPosting, setIsPosting] = useState<boolean>(false);

    const toggleLike = async () => {
        //Проверка на пендинг, для однократного срабатывания функции
        if (isPosting) return;
        setIsPosting(true);

        const previousLiked = isLiked;
        const delta = previousLiked ? -1 : 1;

        setIsLiked(!previousLiked);
        setLikeCount((prev) => prev + delta);

        try {
            await mutate(
                "/api/goals/like",
                async () => {
                    const res = await fetch("/api/goals/like", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ goalId: goal.id }),
                    });
                    if (!res.ok) {
                        throw new Error("Не удалось обновить лайк");
                    }
                    return res.json();
                },
                {
                    optimisticData: {
                        isLiked: !previousLiked,
                        _count: { likes: likeCount + delta },
                    },
                    rollbackOnError: true,
                    revalidate: false,
                }
            );
        } catch (error) {
            setIsLiked(previousLiked);
            setLikeCount((prev) => prev - delta);
            console.error("Ошибка запроса", error);
        } finally {
            setIsPosting(false);
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
                padding: "0.25rem 1.25rem",
                borderRadius: "0.75rem",
                border: "1px #030712 solid",
                color: isLiked ? "#f9f9f9" : "#030712",
                display: "flex",
                alignItems: "center",
                transition: "300ms ease all",
                backgroundColor: isLiked ? "#030712" : "#f9f9f9",
            }}
            startIcon={isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
            variant="outlined"
            disabled={status === "unauthenticated"}
            disableTouchRipple={isPosting}
        >
            <span className="mt-1 flex items-center">
                {likeCount} {support}{" "}
                {isPosting && (
                    <CircularProgress
                        thickness={5.5}
                        size={20}
                        sx={{
                            marginLeft: "10px",
                            marginTop: "-2px",
                            color: isLiked ? "white" : "black",
                        }}
                    />
                )}
            </span>
        </Button>
    );
}
