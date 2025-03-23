import { Goal } from "@/shared/types/goal";
import { AnimatePresence, motion } from "framer-motion";
import LikeButton from "@/features/like/ui/LikeButton";
import UserMini from "./UserMini";
import DeleteGoal from "@/features/goals/deleteGoal/DeleteGoal";

interface GoalCardProps {
    goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
    return (
        <AnimatePresence>
            <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full bg-gray-50 rounded-2xl p-4 shadow-lg border-[1px] border-gray-300 z-20 relative"
            >
                <div className="mb-4 text-gray-950 flex justify-between items-center sm:flex-row flex-col-reverse  gap-x-3">
                    <div className="sm:space-y-0 sm:text-start text-center space-y-4 flex flex-col">
                        <h1 className="text-2xl font-bold">{goal.title}</h1>
                        <p className="inline items-start break-words w-full">
                            <span>Описание: </span> {goal.description}
                        </p>
                    </div>
                    <div className="sm:w-auto w-full">
                        {goal.user ? (
                            <UserMini goal={goal} />
                        ) : (
                            <div className="w-full flex justify-end">
                                <DeleteGoal id={goal.id} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 grid-cols-1">
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-extrabold text-xl">
                        Specific{" "}
                        <p className="font-normal text-base h-fit w-full whitespace-normal break-words">
                            {goal.specific}
                        </p>
                    </div>
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-extrabold text-xl">
                        Measure{" "}
                        <p className="font-normal text-base h-fit w-full whitespace-normal break-words">
                            {goal.measurable}
                        </p>
                    </div>
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-extrabold text-xl">
                        Achievable{" "}
                        <p className="font-normal text-base h-fit w-full whitespace-normal break-words">
                            {goal.achievable}
                        </p>
                    </div>
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-extrabold text-xl">
                        Relevant{" "}
                        <p className="font-normal text-base h-fit w-full whitespace-normal break-words">
                            {goal.relevant}
                        </p>
                    </div>
                    <div className="sm:col-span-2 bg-gray-950 rounded-2xl text-gray-50 p-4 font-extrabold text-xl col-span-1">
                        Time-bound{" "}
                        <p className="font-normal text-base h-fit w-full whitespace-normal break-words">
                            {goal.timeBoundText}
                        </p>
                    </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                    <div className="flex space-x-2">
                        <LikeButton goal={goal} />
                    </div>

                    <p className="font-medium text-base text-end text-gray-700">
                        До: {goal.timeBoundDate}
                    </p>
                </div>
            </motion.li>
        </AnimatePresence>
    );
}
