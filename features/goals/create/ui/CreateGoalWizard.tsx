"use client";

//сделать отдельную страницу для редиректа на авторизацию

import { useSession } from "next-auth/react";
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
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { goalSchema } from "@/shared/schemas/goal";
import { redirect } from "next/navigation";
import PageLoader from "@/shared/loading/PageLoader";

const stepsComponents: { [key: string]: React.ReactNode } = {
    title: <TitleStep key="title" />,
    description: <DescriptionStep key="description" />,
    specific: <SpecificStep key="specific" />,
    measurable: <MeasurableStep key="measurable" />,
    achievable: <AchievableStep key="achievable" />,
    relevant: <RelevantStep key="relevant" />,
    timeBound: <TimeBoundStep key="timebound" />,
    preview: <PreviewStep key="preview" />,
};

type FormFields = {
    title: string;
    description: string;
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBoundText: string;
    timeBoundDate: string;
    isPublic: boolean;
};

export default function CreateGoalWizard() {
    const stage = useGoalState((state) => state.stage);
    const stages = useGoalState((state) => state.stages);
    const isPublic = useGoalState((state) => state.isPublic);
    const setIsPublic = useGoalState((state) => state.setIsPublic);
    const nextStep = useGoalState((state) => state.nextStep);
    const prevStep = useGoalState((state) => state.prevStep);

    const session = useSession();

    const currentStepName = stages[stage];

    const methods = useForm<FormFields>({
        resolver: zodResolver(goalSchema),
        defaultValues: {
            title: "",
            description: "",
            specific: "",
            measurable: "",
            achievable: "",
            relevant: "",
            timeBoundText: "",
            timeBoundDate: "",
            isPublic: false,
        },
    });

    const validateStep = async () => {
        let fieldsToValidate: (keyof FormFields)[] = [];
        if (stage === 0) {
            fieldsToValidate = ["title"];
        } else if (stage === 1) {
            fieldsToValidate = ["description"];
        } else if (stage === 2) {
            fieldsToValidate = ["specific"];
        } else if (stage === 3) {
            fieldsToValidate = ["measurable"];
        } else if (stage === 4) {
            fieldsToValidate = ["achievable"];
        } else if (stage === 5) {
            fieldsToValidate = ["relevant"];
        } else if (stage === 6) {
            fieldsToValidate = ["timeBoundText", "timeBoundDate"];
        }
        const isValid = await methods.trigger(fieldsToValidate);
        if (isValid) {
            nextStep();
        }
    };

    if (session.status === "loading") {
        return <PageLoader />;
    }

    if (session.status === "unauthenticated") {
        return (
            <div className="text-gray-950 text-3xl text-center flex flex-col items-center justify-center">
                <p>Пожалуйста авторизуйтесь, для создания цели.</p>
                <Link
                    href="/login"
                    className="border-[1px] px-4 py-2 border-gray-950 rounded-2xl mt-5 mx-auto w-fit"
                >
                    Вход
                </Link>
            </div>
        );
    }

    const handleSubmit = async () => {
        const data = methods.getValues();
        try {
            const response = await fetch("api/goals/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data, isPublic }),
            });
            if (!response.ok) {
                throw new Error("Ошибка создания цели");
            }
        } catch (error) {
            console.error(error);
        } finally {
            redirect("/profile/me");
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                className="z-10"
                onSubmit={methods.handleSubmit(handleSubmit)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
            >
                <motion.div
                    className="text-gray-950 flex flex-col gap-y-7 mt-5 max-w-[900px] min-w-[650px]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h1 className="text-6xl font-light text-center">
                            Создание <span className="font-medium">SMART</span>{" "}
                            цели
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
                                type="button"
                                onClick={prevStep}
                                className="border-[1px] border-gray-600 rounded-2xl px-4 py-2 duration-200 ease transition-all text-gray-600 text-xl hover:bg-gray-100"
                            >
                                Назад
                            </button>
                        )}
                        {stage < stages.length - 1 ? (
                            <button
                                type="button"
                                onClick={() => {
                                    validateStep();
                                }}
                                className="shadow-md border-[1px] border-transparent rounded-2xl px-4 py-2 bg-gray-950 text-gray-50 duration-200 ease transition-all hover:shadow-lg text-xl hover:bg-gray-900"
                            >
                                Далее
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
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
                                <button
                                    type="submit"
                                    className=" shadow-md border-[1px] border-transparent rounded-2xl px-4 py-2 bg-gray-950 text-gray-50 duration-200 ease transition-all hover:shadow-lg text-xl hover:bg-gray-900 "
                                >
                                    Сохранить цель
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            </form>
        </FormProvider>
    );
}
