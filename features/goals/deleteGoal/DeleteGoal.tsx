import { useState } from "react";
import { toast } from "sonner";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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
            className="transition-all duration-300 ease-in-out hover:bg-red-300
        rounded-lg p-1
        "
            onClick={() => {
                deleteGoal();
            }}
            disabled={loading}
        >
            <DeleteOutlineOutlinedIcon
                sx={{
                    color: "#6b7280",
                }}
            />
        </button>
    );
}
