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
            <div className="mb-4 text-gray-950 flex justify-between items-center">
                <div className="w-3/4">
                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={"50%"}
                        sx={{ bgcolor: `${skeletonBgColor}` }}
                    />

                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={"70%"}
                        sx={{ bgcolor: `${skeletonBgColor}` }}
                    />
                </div>
                <div className="w-1/4 flex items-center justify-end gap-x-4">
                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={"60%"}
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

            <div className="grid grid-cols-2 gap-4">
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
                    variant="rounded"
                    width={"100%"}
                    height={80}
                    sx={{
                        gridColumn: "span 2 / span 2",
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
