"use client";
import SmartWidget from "@/shared/SmartWidget";
import { motion } from "framer-motion";
export default function Home() {
    return (
        <div className="h-screen mb-[1000px] bg-gray-50 flex items-center">
            <section className="mx-auto w-[75%] flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-black w-fit "
                >
                    <h1 className="text-7xl font-bold">
                        Добро пожаловать в
                        <span className="rounded-2xl text-white bg-gray-950 px-2 py-1 font-extrabold ml-4 shadow-2xl">
                            FUX
                        </span>
                    </h1>
                    <h2 className="text-4xl mt-8">
                        Создавайте SMART-цели, отслеживайте прогресс и <br />
                        делитесь успехами с сообществом.
                    </h2>
                </motion.div>
                <motion.div
                    className="flex flex-col gap-y-4 grow justify-center items-end "
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
            </section>
        </div>
    );
}
