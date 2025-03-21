import { useState } from "react";
import { toast } from "sonner";

interface DeleteGoalProps {
    id: string;
}

export default function DeleteGoal({ id: goalId }: DeleteGoalProps) {
    const [loading, setLoading] = useState<boolean>(false);

    async function deleteGoal() {
        try {
            setLoading(true);
            const res = await fetch(`/api/goals/delete/${goalId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("Цель удалена!");
            } else {
                const errorData = await res.json();

                toast.error(errorData.error || "Ошибка удаления");
            }
        } catch {
            toast.error("Ошибка соединения с сервером");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={() => {
                deleteGoal();
            }}
            disabled={loading}
        >
            {loading ? "Удаление..." : "Удалить"}
        </button>
    );
}
