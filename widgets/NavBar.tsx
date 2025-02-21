"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="w-full flex justify-between items-center text-gray-400 h-full">
            <Link
                href="/"
                className={`${
                    pathname === "/" ? "active" : ""
                } transition-all ease duration-200 hover:text-gray-50 h-full flex items-center`}
            >
                Главная
            </Link>
            <Link
                href="/about"
                className={`${
                    pathname === "/about" ? "active" : ""
                } transition-all ease duration-200 hover:text-gray-50 h-full flex items-center`}
            >
                О нас
            </Link>
            <Link
                href="/social"
                className={`${
                    pathname === "/social" ? "active" : ""
                } transition-all ease duration-200 hover:text-gray-50 h-full flex items-center`}
            >
                Цели
            </Link>
            <Link
                href="/create"
                className={`${
                    pathname === "/create" ? "active" : ""
                } transition-all ease duration-200 hover:text-gray-50 h-full flex items-center`}
            >
                Создать цель
            </Link>
        </nav>
    );
}
