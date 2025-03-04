"use client";
import GoalCard from "@/entities/goal/GoalCard";
import GoalCardSkeleton from "@/shared/skeletons/GoalCardSkeleton";
import { Goal } from "@/shared/types/goal";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Social() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const perPage = 5;

    const { data, isLoading } = useSWR(
        `/api/goals/public?page=${page}&perPage=${perPage}`,
        fetcher,
        {
            refreshInterval: 5000,
        }
    );

    useEffect(() => {
        if (data) {
            setGoals(data.goals);
            setTotal(data.total);
        }
    }, [data]);

    const totalPages = Math.ceil(total / perPage);
    return (
        <>
            <div className="flex flex-col w-full space-y-10">
                <div className="w-3/4 mx-auto">
                    <h1 className="text-5xl font-bold text-gray-950 mb-10">
                        Публичные цели
                    </h1>
                    <ul className="space-y-10">
                        {isLoading
                            ? Array(perPage)
                                  .fill(0)
                                  .map((_, i) => <GoalCardSkeleton key={i} />)
                            : goals.map((goal: Goal) => (
                                  <GoalCard key={goal.id} goal={goal} />
                              ))}
                    </ul>
                </div>

                {goals.length && (
                    <div className="mx-auto px-4 py-2 shadow-md rounded-2xl bg-gray-300 text-gray-950 space-x-5">
                        <button
                            onClick={() => {
                                setPage((prev) => Math.max(prev - 1, 1));
                            }}
                            disabled={page === 1}
                        >
                            Назад
                        </button>
                        <span>
                            Страница {page} из {totalPages}
                        </span>
                        <button
                            onClick={() => {
                                setPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                );
                            }}
                            disabled={page === totalPages}
                        >
                            Вперед
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
