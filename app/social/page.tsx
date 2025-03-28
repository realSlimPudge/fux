"use client";
import GoalCard from "@/entities/goal/GoalCard";
import GoalCardSkeleton from "@/shared/skeletons/GoalCardSkeleton";
import { Goal } from "@/shared/types/goal";
import { useEffect, useState } from "react";
import useSWR from "swr";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Social() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<"asc" | "desc">("desc");
    const perPage = 5;

    const { data, isLoading } = useSWR(
        `/api/goals/public?page=${page}&perPage=${perPage}&sort=${sort}`,
        fetcher,
        {
            refreshInterval: 5000,
        }
    );

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    }, [page]);

    useEffect(() => {
        if (data) {
            setGoals(data.goals);
            setTotal(data.total);
        }
    }, [data]);

    const handleChangeSort = () => {
        if (sort === "asc") {
            setSort("desc");
        } else if (sort === "desc") {
            setSort("asc");
        }
    };

    const sortValue = () => {
        if (sort === "asc") {
            return "сначала старые";
        } else if (sort === "desc") {
            return "сначала новые";
        }
    };

    const totalPages = Math.ceil(total / perPage);
    return (
        <>
            <div className="flex flex-col w-full space-y-10">
                <div className="sm:w-3/4 w-11/12 mx-auto space-y-5">
                    <h1 className="text-5xl font-bold text-gray-950">
                        Публичные цели
                    </h1>
                    <button
                        onClick={handleChangeSort}
                        className="bg-gray-950 px-4 py-2 text-base rounded-2xl"
                    >
                        Сортировка по дате:{" "}
                        <span className="text-base font-bold">
                            {sortValue()}
                        </span>
                    </button>
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
                    <div className="mx-auto  shadow-md rounded-2xl bg-gray-950 text-gray-50 space-x-5 font-bold">
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
                                setPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                );
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
            </div>
        </>
    );
}
