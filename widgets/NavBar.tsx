"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="w-full flex justify-center items-center h-full text-gray-950 gap-x-4">
            <Link
                href="/"
                className={`${
                    pathname === "/" ? "active" : ""
                }  transition-all ease duration-200  h-full flex items-center rounded-lg px-2 border-transparent border-[1px] hover:border-gray-700`}
            >
                Главная
            </Link>

            <Link
                href="/social"
                className={`${
                    pathname === "/social" ? "active" : ""
                } transition-all ease duration-200  h-full flex items-center rounded-lg px-2 border-transparent border-[1px] hover:border-gray-700`}
            >
                Цели
            </Link>
            <Link
                href="/create"
                className={`${
                    pathname === "/create" ? "active" : ""
                } transition-all ease duration-200  h-full flex items-center rounded-lg px-2 border-transparent border-[1px] hover:border-gray-700`}
            >
                Создать цель
            </Link>
        </nav>
    );
}
