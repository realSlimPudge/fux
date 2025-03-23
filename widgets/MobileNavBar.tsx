"use client";

import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileNavBar() {
    const pathname = usePathname();

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(
                prevScrollPos > currentScrollPos || currentScrollPos < 10
            );
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    const isMobile = useMediaQuery("(max-width:640px)");

    if (!isMobile) {
        return null;
    }

    return (
        <aside
            className={`w-[76%] mx-auto h-[45px] shadow-md bg-gray-100 z-30 fixed left-[50%] transform bottom-[20px] translate-x-[-50%]
         flex items-center border-gray-300 border-[1px] rounded-3xl transition-all ease-in-out duration-500 ${
             visible ? "translate-y-0" : "translate-y-[150%]"
         } `}
        >
            <nav className="flex w-full h-full justify-between items-center text-gray-950 ">
                <Link
                    href="/"
                    className={`${
                        pathname === "/" ? "active__mobile" : ""
                    }  transition-all ease duration-200  h-full flex items-center rounded-3xl px-3 border-transparent border-[1px] hover:border-gray-700`}
                >
                    Главная
                </Link>

                <Link
                    href="/social"
                    className={`${
                        pathname === "/social" ? "active__mobile" : ""
                    } transition-all ease duration-200  h-full flex items-center rounded-3xl px-3 border-transparent border-[1px] hover:border-gray-700`}
                >
                    Цели
                </Link>
                <Link
                    href="/create"
                    className={`${
                        pathname === "/create" ? "active__mobile" : ""
                    } transition-all ease duration-200  h-full flex items-center rounded-3xl px-3 border-transparent border-[1px] hover:border-gray-700`}
                >
                    Создать
                </Link>
            </nav>
        </aside>
    );
}
