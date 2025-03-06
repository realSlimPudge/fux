"use client";
import SmartWidget from "@/shared/SmartWidget";
import RoundCorner from "@/shared/svgs/RoundCorner";
import { motion } from "framer-motion";
export default function Home() {
    return (
        <section className="min-h-screen mainBg mx-auto w-screen flex justify-center items-center overflow-hidden">
            <div
                className="w-[75%] flex justify-between items-center sm:flex-row flex-col 
           "
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-black sm:h-fit h-screen sm:text-start text-center flex flex-col sm:items-start
                     sm:justify-normal items-center justify-center relative "
                >
                    <div className="sm:hidden block w-[200%] h-[344px] absolute z-0 transform translate-x-[-50%] translate-y-[-50%] top-[82%] left-[55%] rotate-45">
                        <RoundCorner />
                    </div>
                    <h1 className="sm:text-7xl text-4xl font-bold z-10 sm:inline flex flex-col gap-y-5 items-center">
                        <span> Добро пожаловать в</span>

                        <span className="w-fit  text-center rounded-2xl text-white bg-gray-950 px-2 py-1 font-extrabold ml-4 shadow-2xl sm:text-7xl text-7xl">
                            FUX
                        </span>
                    </h1>
                    <h2 className="sm:text-4xl text-xl mt-8 font-light z-10">
                        Создавайте SMART-цели, отслеживайте прогресс и <br />
                        делитесь успехами с сообществом.
                    </h2>
                </motion.div>
                <motion.div
                    className="flex sm:h-fit h-screen flex-col gap-y-4 grow w-full sm:hidden
                sm:items-start sm:justify-normal items-end justify-center"
                >
                    <SmartWidget
                        title="S"
                        minititle="Specific"
                        description="Цель должна быть четко определена и однозначно сформулирована, чтобы обеспечить ясное понимание."
                        tip={true}
                        x={15}
                        delay={0.1}
                    />
                    <SmartWidget
                        delay={0.2}
                        x={-10}
                        title="M"
                        minititle="Measurable"
                        description="Необходимо установить критерии, по которым можно оценить прогресс и определить, достигнута ли цель."
                    />
                    <SmartWidget
                        delay={0.3}
                        x={20}
                        title="A"
                        minititle="Achievable"
                        description="Цель должна быть реалистичной и достижимой с учетом доступных ресурсов, возможностей и ограничений."
                    />
                    <SmartWidget
                        delay={0.4}
                        x={-20}
                        title="R"
                        minititle="Relevant"
                        description="Цель должна быть значимой и соответствовать вашим долгосрочным планам или ценностям."
                    />
                    <SmartWidget
                        delay={0.5}
                        x={20}
                        title="T"
                        minititle="Time-bound"
                        description="Цель должна иметь четкие временные рамки, чтобы можно было отслеживать прогресс и сохранять мотивацию."
                    />
                </motion.div>
                <motion.div
                    className="flex flex-col gap-y-4 grow justify-center items-end max-sm:hidden"
                    initial={{ x: -150 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.4, delay: 1 }}
                >
                    <SmartWidget
                        title="S"
                        minititle="Specific"
                        description="Цель должна быть четко определена и однозначно сформулирована, чтобы обеспечить ясное понимание."
                        tip={true}
                        x={15}
                        delay={0.1}
                    />
                    <SmartWidget
                        delay={0.2}
                        x={-10}
                        title="M"
                        minititle="Measurable"
                        description="Необходимо установить критерии, по которым можно оценить прогресс и определить, достигнута ли цель."
                    />
                    <SmartWidget
                        delay={0.3}
                        x={20}
                        title="A"
                        minititle="Achievable"
                        description="Цель должна быть реалистичной и достижимой с учетом доступных ресурсов, возможностей и ограничений."
                    />
                    <SmartWidget
                        delay={0.4}
                        x={-20}
                        title="R"
                        minititle="Relevant"
                        description="Цель должна быть значимой и соответствовать вашим долгосрочным планам или ценностям."
                    />
                    <SmartWidget
                        delay={0.5}
                        x={20}
                        title="T"
                        minititle="Time-bound"
                        description="Цель должна иметь четкие временные рамки, чтобы можно было отслеживать прогресс и сохранять мотивацию."
                    />
                </motion.div>
            </div>
        </section>
    );
}
