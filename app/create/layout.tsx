import Corner from "@/shared/svgs/Corner";
import RoundCorner from "@/shared/svgs/RoundCorner";

export default function CreateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="bg-gray-100 text-white min-w-screen min-h-screen relative overflow-hidden flex justify-center items-center">
            <div
                className="absolute w-[800px] h-[800px] transform translate-x-[-50%] 
             translate-y-[-50%] left-[5%] top-[10%] rotate-[-90deg] z-0 sm:opacity-100 opacity-50"
            >
                <RoundCorner />
            </div>
            <div className="z-10 flex justify-center">{children}</div>
            <div
                className="absolute w-[800px] h-[800px] transform translate-x-[-50%] 
             translate-y-[-50%] left-[96%] top-[90%] -rotate-45 z-0 sm:opacity-100 opacity-50"
            >
                <Corner />
            </div>
        </section>
    );
}
