"use client";
import GoalCard from "@/entities/goal/GoalCard";
import GoalCardSkeleton from "@/shared/skeletons/GoalCardSkeleton";
import { Goal } from "@/shared/types/goal";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfileGoalsList() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const perPage = 5;

    const { id } = useParams();
    const { data, isLoading } = useSWR(
        `/api/user/goals/${id}/public?page=${page}&perPage=${perPage}`,
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
            <ul className="space-y-10 w-full">
                {isLoading
                    ? Array(2)
                          .fill(0)
                          .map((_, i) => <GoalCardSkeleton key={i} />)
                    : goals?.map((goal: Goal) => (
                          <GoalCard key={goal.id} goal={goal} />
                      ))}
            </ul>
            {goals.length && goals.length > 5 && (
                <div className="mx-auto w-fit mt-5 shadow-md rounded-2xl bg-gray-950 text-gray-50 space-x-5 font-bold">
                    <button
                        className="bg-gray-950 px-3 py-2 text-base rounded-2xl disabled:opacity-50 ease transition-all duration-200
                    hover:bg-gray-900
                    "
                        onClick={() => {
                            setPage((prev) => Math.max(prev - 1, 1));
                        }}
                        disabled={page === 1}
                    >
                        <NavigateBeforeIcon
                            sx={{
                                color: "white",
                            }}
                        />
                    </button>
                    <span>
                        Страница {page} из {totalPages}
                    </span>
                    <button
                        className="bg-gray-950 px-3 py-2 text-base rounded-2xl disabled:opacity-50 ease transition-all duration-200
                    hover:bg-gray-900"
                        onClick={() => {
                            setPage((prev) => Math.min(prev + 1, totalPages));
                        }}
                        disabled={page === totalPages}
                    >
                        <NavigateNextIcon
                            sx={{
                                color: "white",
                            }}
                        />
                    </button>
                </div>
            )}
        </>
    );
}
