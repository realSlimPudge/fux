"use client";

import ProfileGoalsList from "@/features/goals/list/ProfileGoalsList";
import ProfileCard from "@/widgets/ProfileCard";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const [error, setError] = useState<string | null>(null);
    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-[600px] sm:py-6 py-4 sm:px-8 px-4 rounded-2xl flex flex-col justify-center items-center text-gray-950"
            >
                <p className="text-center font-light text-3xl text-gray-700">
                    Ошибка:
                </p>
                <p className="text-center text-4xl">{error}</p>
            </motion.div>
        );
    }
    return (
        <div className="sm:w-[80%] w-11/12 mx-auto flex justify-center items-start gap-x-10 sm:gap-y-0 gap-y-10 sm:flex-row flex-col">
            <div className="h-fit sm:w-1/4 w-full">
                <ProfileCard setError={setError} />
            </div>

            <div className="sm:w-3/4 w-full">
                <ProfileGoalsList />
            </div>
        </div>
    );
}
