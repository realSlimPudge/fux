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
        timeBoundText,
        timeBoundDate,
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

                <div className="grid sm:grid-cols-2 gap-4 grid-cols-1">
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                        Specific{" "}
                        <p className="font-normal text-base h-fit whitespace-normal break-words">
                            {specific}
                        </p>
                    </div>
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                        Measure{" "}
                        <p className="font-normal text-base h-fit whitespace-normal break-words">
                            {measurable}
                        </p>
                    </div>
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                        Achievable{" "}
                        <p className="font-normal text-base h-fit whitespace-normal break-words">
                            {achievable}
                        </p>
                    </div>
                    <div className="bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl">
                        Relevant{" "}
                        <p className="font-normal text-base h-fit whitespace-normal break-words">
                            {relevant}
                        </p>
                    </div>
                    <div className="sm:col-span-2 col-span-1 bg-gray-950 rounded-2xl text-gray-50 p-4 font-bold text-xl ">
                        Time-bound{" "}
                        <p className="font-normal text-base h-fit w-full whitespace-normal break-words">
                            {timeBoundText}
                        </p>
                    </div>
                </div>
                <div className="mt-3">
                    <p className="font-medium text-base text-end text-gray-700">
                        До: {timeBoundDate}
                    </p>
                </div>
            </div>
        </FormAnimation>
    );
}
