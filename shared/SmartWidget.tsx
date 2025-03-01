import { motion } from "framer-motion";

type Props = {
    title: string;
    minititle: string;
    description: string;
    tip?: boolean;
    x: number;
    delay: number;
};

export default function SmartWidget({
    title,
    minititle,
    description,
    tip,
    x,
    delay,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: x }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className="text-8xl flex justify-center items-center font-semibold 
                         cursor-default relative overflow-visible group shadow-2xl rounded-2xl"
        >
            <div
                className={`group-hover:bg-gray-900 relative z-10 bg-gray-950 w-28 h-28 rounded-2xl flex justify-center items-center transition-all ease duration-300 `}
            >
                {title}
            </div>
            {tip && (
                <motion.div
                    className="absolute left-[-15%] text-white text-sm ease-in-out duration-500 rounded-full
                             bg-gray-950 w-5 h-9 flex justify-center items-center
                            rounded-tr-none rounded-br-none
                            transition-all group-hover:opacity-0"
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.4, delay: 1 }}
                >
                    {"<"}
                </motion.div>
            )}

            <div
                className="h-full rounded-2xl border-2 border-gray-500 absolute transform left-0 z-0 w-[210%] opacity-0
                        transition-all ease-in-out duration-500 translate-x-[-50%] group-hover:translate-x-[-94%] group-hover:opacity-100
                        text-lg text-black rounded-tr-none rounded-br-none border-r-0 shadow-lg px-3 backdrop-blur-sm"
            >
                <h3 className="text-center mt-2 text-sm px-2">{minititle}</h3>
                <p className="text-xs font-light text-center px-2 pr-3">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
