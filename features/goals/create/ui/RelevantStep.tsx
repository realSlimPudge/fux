"use client";

import FormAnimation from "@/shared/formAnimation/FormAnimation";
import { useGoalState } from "../../state/store";

export default function RelevantStep() {
    const relevant = useGoalState((state) => state.relevant);
    const setField = useGoalState((state) => state.setField);

    return (
        <FormAnimation>
            <h2 className="text-lg mb-3  text-center font-semibold flex items-center justify-center gap-x-1">
                <span className="font-bold bg-gray-950 text-gray-50 text-2xl w-10 h-10 rounded-xl flex justify-center items-center">
                    R
                </span>{" "}
                – Relevant (Актуальная)
            </h2>
            <p className="mb-2 text-center w-5/6 mx-auto font-medium text-base">
                <span className="font-bold">Описание:</span> Цель должна иметь
                значение для вас, соответствовать вашим ценностям и долгосрочным
                планам. Она должна быть полезной и мотивирующей.
            </p>
            <p className="mb-5 w-5/6 mx-auto text-center text-base text-gray-600 font-light">
                <span className="font-medium ">Пример:</span> «Улучшить
                физическую форму для повышения уровня энергии и уверенности в
                себе, что поможет лучше справляться с рабочими задачами».
            </p>
            <textarea
                value={relevant}
                onChange={(e) => setField("relevant", e.target.value)}
                placeholder="Значимая цель"
                className="w-full bg-gray-100 h-56 outline-none text-2xl bg-transparent border-[1px] border-gray-300 rounded-2xl px-3 py-4
                placeholder:font-light focus:border-gray-400 max-h-[320px] min-h-[240px]
                "
            />
        </FormAnimation>
    );
}
