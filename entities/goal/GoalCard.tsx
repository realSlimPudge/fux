import { Goal } from "@/shared/types/goal";
import Image from "next/image";
import Link from "next/link";

interface GoalCardProps {
    goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
    return (
        <li className="w-full bg-gray-50 rounded-2xl p-4 shadow-lg border-[1px] border-gray-300">
            <div className="mb-4 text-gray-950 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold">
                        <span>Название цели: </span> {goal.title}
                    </h1>
                    <p className="inline items-start break-words w-full">
                        <span>Описание: </span> {goal.description}
                    </p>
                </div>
                <Link
                    href={`/profile/${goal.userId}`}
                    className=" flex items-center justify-center gap-x-4"
                >
                    <p className="text-xl font-bold">{goal.user.name}</p>

                    <div className=" w-[35px] h-[35px] overflow-hidden rounded-full flex items-center justify-center relative ">
                        <Image
                            alt="user"
                            src={goal.user.profile.avatar}
                            className="w-full h-full top-0 left-0 object-cover "
                            fill
                            objectFit="cover"
                            draggable={false}
                        />
                    </div>
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                    Specific{" "}
                    <p className="font-medium text-base">{goal.specific}</p>
                </div>
                <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                    Measure{" "}
                    <p className="font-medium text-base">{goal.measurable}</p>
                </div>
                <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                    Achievable{" "}
                    <p className="font-medium text-base">{goal.achievable}</p>
                </div>
                <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                    Relevant{" "}
                    <p className="font-medium text-base">{goal.relevant}</p>
                </div>
                <div className="col-span-2 bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl ">
                    Time-bound{" "}
                    <p className="font-medium text-base">
                        {goal.timeBoundText}
                    </p>
                </div>
            </div>
            <div className="mt-3">
                <p className="font-medium text-base text-end text-gray-700">
                    До: {goal.timeBoundDate}
                </p>
            </div>
        </li>
    );
}
