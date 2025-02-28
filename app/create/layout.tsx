export default function CreateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="bg-gray-100 text-white w-screen h-screen relative overflow-hidden corner1 ">
            {children}
        </section>
    );
}
