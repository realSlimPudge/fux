export default function GoalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="bg-gray-100 text-white w-screen min-h-screen sm:pt-32 pt-20 pb-20">
            {children}
        </section>
    );
}
