"use client";
import GoalCard from "@/entities/goal/GoalCard";
import PageContainer from "@/shared/PageContainer";
import { Goal } from "@/shared/types/goal";
import { useEffect, useState } from "react";

export default function Social() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const perPage = 5;

    useEffect(() => {
        async function fetchGoals() {
            try {
                const res = await fetch(
                    `api/goals/public?page=${page}&perPage=${perPage}`
                );
                const data = await res.json();
                setGoals(data.goals);
                setTotal(data.total);
            } catch (error) {
                console.error("Ошибка при получении целей: ", error);
            }
        }
        fetchGoals();
    }, [page]);
    const totalPages = Math.ceil(total / perPage);
    return (
        <PageContainer>
            <div className="flex flex-col w-full space-y-10">
                <div className="w-3/4 mx-auto">
                    <h1 className="text-2xl text-gray-950">Публичные цели</h1>
                    <ul className="space-y-10">
                        {goals.map((goal: Goal) => (
                            <GoalCard key={goal.id} goal={goal} />
                        ))}
                    </ul>
                </div>

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
                            setPage((prev) => Math.min(prev + 1, totalPages));
                        }}
                        disabled={page === totalPages}
                    >
                        Вперед
                    </button>
                </div>
            </div>
        </PageContainer>
    );
}
