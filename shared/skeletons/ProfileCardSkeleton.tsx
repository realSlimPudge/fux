import { Skeleton } from "@mui/material";

export default function ProfileCardSkeleton() {
    const skeletonBgColor: string = "#d1d5db";
    return (
        <div className="bg-gray-50 py-6 px-8 rounded-2xl h-full shadow-sm">
            <div className="flex justify-end">
                <Skeleton
                    variant="text"
                    animation="wave"
                    width={100}
                    sx={{
                        textAlign: "end",
                        bgcolor: `${skeletonBgColor}`,
                        fontSize: "2.50rem",
                    }}
                />
            </div>
            <div>
                <div className=" rounded-full w-80 h-80 mt-3 mb-10 group relative">
                    <Skeleton
                        variant="circular"
                        animation="wave"
                        sx={{
                            bgcolor: `${skeletonBgColor}`,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                        }}
                        width={320}
                        height={320}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-y-5">
                <div>
                    <Skeleton
                        variant="rounded"
                        sx={{
                            bgcolor: `${skeletonBgColor}`,
                            marginBottom: "10px",
                        }}
                        animation="wave"
                        height={25}
                        width={90}
                    />
                    <Skeleton
                        variant="rounded"
                        sx={{ bgcolor: `${skeletonBgColor}` }}
                        animation="wave"
                        height={80}
                    />
                </div>
                <div className="flex justify-between items-center ">
                    <Skeleton
                        variant="rounded"
                        sx={{
                            bgcolor: `${skeletonBgColor}`,
                        }}
                        animation="wave"
                        height={35}
                        width={200}
                    />
                    <Skeleton
                        variant="rounded"
                        sx={{ bgcolor: `${skeletonBgColor}` }}
                        animation="wave"
                        height={35}
                        width={90}
                    />
                </div>
            </div>
        </div>
    );
}
