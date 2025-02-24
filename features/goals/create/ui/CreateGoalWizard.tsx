"use client";

import { useGoalState } from "../../state/store";
import AchievableStep from "./AchievableStep";
import DescriptionStep from "./DescriptionStep";
import MeasurableStep from "./MeasurableStep";
import PreviewStep from "./PreviewStep";
import RelevantStep from "./RelevantStep";
import SpecificStep from "./SpecificStep";
import TimeBoundStep from "./TimeBound";
import TitleStep from "./TitleStep";
import { motion } from "framer-motion";

const stepsComponents: { [key: string]: React.ReactNode } = {
    title: <TitleStep />,
    description: <DescriptionStep />,
    specific: <SpecificStep />,
    measurable: <MeasurableStep />,
    achievable: <AchievableStep />,
    relevant: <RelevantStep />,
    timeBound: <TimeBoundStep />,
    preview: <PreviewStep />,
};

export default function CreateGoalWizard() {
    const stage = useGoalState((state) => state.stage);
    const stages = useGoalState((state) => state.stages);
    const isPublic = useGoalState((state) => state.isPublic);
    const setIsPublic = useGoalState((state) => state.setIsPublic);
    const nextStep = useGoalState((state) => state.nextStep);
    const prevStep = useGoalState((state) => state.prevStep);

    const currentStepName = stages[stage];

    return (
        <motion.div
            className="text-gray-950 flex flex-col gap-y-7 mt-5 max-w-[900px] min-w-[650px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div>
                <h1 className="text-6xl font-light text-center">
                    Создание <span className="font-medium">SMART</span> цели
                </h1>
                <p className="text-center text-gray-600 mt-2 text-2xl font-light separator w-fit mx-auto">
                    Этап {stage + 1} из {stages.length}:{" "}
                    {currentStepName.toUpperCase()}
                </p>
            </div>

            <div className="min-h-[440px] flex justify-center items-center">
                {stepsComponents[currentStepName]}
            </div>
            <div className="flex justify-center items-center w-fit mx-auto gap-x-10">
                {stage > 0 && (
                    <button
                        onClick={prevStep}
                        className="border-[1px] border-gray-600 rounded-2xl px-4 py-2 duration-200 ease transition-all text-gray-600 text-xl hover:bg-gray-100"
                    >
                        Назад
                    </button>
                )}
                {stage < stages.length - 1 ? (
                    <button
                        onClick={nextStep}
                        className="shadow-md border-[1px] border-transparent rounded-2xl px-4 py-2 bg-gray-950 text-gray-50 duration-200 ease transition-all hover:shadow-lg text-xl hover:bg-gray-900"
                    >
                        Далее
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                setIsPublic(!isPublic);
                            }}
                            className={`${
                                isPublic
                                    ? "border-[1px] border-gray-600 rounded-2xl px-4 py-2 duration-200 ease transition-all text-gray-600 text-xl hover:bg-gray-100"
                                    : "shadow-md border-[1px] border-transparent rounded-2xl px-4 py-2 bg-gray-950 text-gray-50 duration-200 ease transition-all hover:shadow-lg text-xl hover:bg-gray-900 "
                            }`}
                        >
                            {isPublic
                                ? "Эта цель видна всем"
                                : "Эта цель видна только вам"}
                        </button>
                        <button className=" shadow-md border-[1px] border-transparent rounded-2xl px-4 py-2 bg-gray-950 text-gray-50 duration-200 ease transition-all hover:shadow-lg text-xl hover:bg-gray-900 ">
                            Сохранить цель
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
}
