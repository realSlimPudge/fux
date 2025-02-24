import FormAnimation from "@/shared/formAnimation/FormAnimation";
import { useGoalState } from "../../state/store";

export default function PreviewStep() {
    const {
        title,
        description,
        specific,
        measurable,
        achievable,
        relevant,
        timeBound,
    } = useGoalState((state) => state);

    return (
        <FormAnimation>
            <div className="w-full bg-gray-50 rounded-2xl p-4 shadow-lg border-[1px] border-gray-300">
                <div className="mb-4">
                    <h1 className="text-xl font-bold">
                        <span>Название цели: </span> {title}
                    </h1>
                    <p className="inline items-start break-words w-full">
                        <span>Описание: </span> {description}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                        Specific{" "}
                        <p className="font-medium text-base">{specific}</p>
                    </div>
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                        Measure{" "}
                        <p className="font-medium text-base">{measurable}</p>
                    </div>
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                        Achievable{" "}
                        <p className="font-medium text-base">{achievable}</p>
                    </div>
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                        Relevant{" "}
                        <p className="font-medium text-base">{relevant}</p>
                    </div>
                    <div className="col-span-2 bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                        Time-bound{" "}
                        <p className="font-medium text-base">{timeBound}</p>
                    </div>
                </div>
            </div>
        </FormAnimation>
    );
}
