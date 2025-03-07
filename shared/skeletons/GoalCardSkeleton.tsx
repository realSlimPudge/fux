import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";

export default function GoalCardSkeleton() {
    const skeletonBgColor: string = "#d1d5db";
    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-gray-50 rounded-2xl p-4 shadow-lg border-[1px] border-gray-300"
        >
            <div
                className="mb-4 text-gray-950 flex justify-between items-center 
             sm:flex-row flex-col-reverse sm:gap-y-0 gap-y-3"
            >
                <div className="sm:w-3/4 w-4/5 sm:block flex flex-col items-center">
                    <Skeleton
                        className="sm:w-1/2 w-[80%]"
                        variant="text"
                        animation="wave"
                        sx={{ bgcolor: `${skeletonBgColor}` }}
                    />

                    <Skeleton
                        className="sm:w-[70%] w-[100%]"
                        variant="text"
                        animation="wave"
                        sx={{ bgcolor: `${skeletonBgColor}` }}
                    />
                </div>
                <div className="sm:w-1/4 w-2/4 flex items-center sm:justify-end justify-center gap-x-4 ">
                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={"40%"}
                        height={30}
                        sx={{
                            textAlign: "end",
                            fontSize: "1.25rem",
                            bgcolor: `${skeletonBgColor}`,
                        }}
                    />
                    <Skeleton
                        variant="circular"
                        animation="wave"
                        width={35}
                        height={35}
                        sx={{ bgcolor: `${skeletonBgColor}` }}
                    />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={80}
                    sx={{ bgcolor: `${skeletonBgColor}` }}
                />
                <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={80}
                    sx={{ bgcolor: `${skeletonBgColor}` }}
                />
                <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={80}
                    sx={{ bgcolor: `${skeletonBgColor}` }}
                />
                <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={80}
                    sx={{ bgcolor: `${skeletonBgColor}` }}
                />
                <Skeleton
                    className="sm:col-span-2 col-span-1"
                    variant="rounded"
                    width={"100%"}
                    height={80}
                    sx={{
                        bgcolor: `${skeletonBgColor}`,
                    }}
                />
            </div>
            <div className="mt-5 flex justify-between">
                <Skeleton
                    variant="text"
                    animation="wave"
                    width={100}
                    sx={{
                        bgcolor: `${skeletonBgColor}`,
                        textAlign: "end",
                        fontSize: "2.50rem",
                    }}
                />
                <Skeleton
                    variant="text"
                    animation="wave"
                    width={100}
                    sx={{
                        textAlign: "end",
                        fontSize: "2.50rem",
                        bgcolor: `${skeletonBgColor}`,
                    }}
                />
            </div>
        </motion.li>
    );
}
