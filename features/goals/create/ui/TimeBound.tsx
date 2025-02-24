"use client";

import FormAnimation from "@/shared/formAnimation/FormAnimation";
import { useGoalState } from "../../state/store";

export default function TimeBoundStep() {
    const timeBound = useGoalState((state) => state.timeBound);
    const setField = useGoalState((state) => state.setField);

    return (
        <FormAnimation>
            <h2 className="text-lg mb-3  text-center font-semibold flex items-center justify-center gap-x-1">
                <span className="font-bold bg-gray-950 text-gray-50 text-2xl w-10 h-10 rounded-xl flex justify-center items-center">
                    T
                </span>{" "}
                – Time-bound (Ограниченная по времени)
            </h2>
            <p className="mb-2 text-center w-5/6 mx-auto font-medium text-base">
                <span className="font-bold">Описание:</span> У цели должен быть
                чёткий дедлайн, определяющий, когда она должна быть достигнута.
                Это помогает сохранять мотивацию и структурировать план
                действий.
            </p>
            <p className="mb-5 w-5/6 mx-auto text-center text-base text-gray-600 font-light">
                <span className="font-medium ">Пример:</span> «Достичь
                поставленной цели за 3 месяца, регулярно отслеживая прогресс
                еженедельно».
            </p>
            <textarea
                value={timeBound}
                onChange={(e) => setField("timeBound", e.target.value)}
                placeholder="Ограниченная во времени цель"
                className="w-full bg-gray-100 h-56 outline-none text-2xl bg-transparent border-[1px] border-gray-300 rounded-2xl px-3 py-4
                placeholder:font-light focus:border-gray-400 max-h-[320px] min-h-[240px]
                "
            />
        </FormAnimation>
    );
}
