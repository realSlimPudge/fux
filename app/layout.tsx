import type { Metadata } from "next";
import "./globals.css";
import Header from "@/shared/Header";
import Providers from "./Providers";
import { Nunito } from "next/font/google";
import MobileNavBar from "@/widgets/MobileNavBar";

export const metadata: Metadata = {
    title: "FUX",
    description:
        "Создавайте SMART-цели, делитесь с другими пользователями, достигайте результата",
};

const openSans = Nunito({
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={openSans.className}>
            <body className="bg-gray-100 text-white ">
                <Providers>
                    <Header />
                    <main>{children}</main>
                    <MobileNavBar />
                </Providers>
            </body>
        </html>
    );
}
