import { motion } from "framer-motion";

type AnimationProps = {
    children: React.ReactNode;
};

export default function FormAnimation({ children }: AnimationProps) {
    return (
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}
