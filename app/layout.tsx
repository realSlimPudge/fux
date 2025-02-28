import type { Metadata } from "next";
import "./globals.css";
import Header from "@/shared/Header";
import Providers from "./Providers";

export const metadata: Metadata = {
    title: "FUX",
    description: "Create SMART-goals",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-gray-100 text-white ">
                <Providers>
                    <Header />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    );
}
