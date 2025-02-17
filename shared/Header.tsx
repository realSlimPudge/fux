import Link from "next/link";

export default function Header() {
    return (
        <div className="flex justify-between items-center border-gray-700 border-[1px] rounded-full w-[90%] mx-auto py-3 px-7 mt-5">
            <div>
                <Link href="/">
                    <h1 className="font-extrabold text-4xl ">FUX</h1>
                </Link>
            </div>
            <nav className="w-[25%] flex justify-between text-gray-400">
                <Link
                    href="/"
                    className="transition-all ease duration-200 hover:text-gray-50"
                >
                    Главная
                </Link>
                <Link
                    href="/about"
                    className="transition-all ease duration-200 hover:text-gray-50"
                >
                    О нас
                </Link>
                <Link
                    href="/social"
                    className="transition-all ease duration-200 hover:text-gray-50"
                >
                    Цели
                </Link>
                <Link
                    href="/create"
                    className="transition-all ease duration-200 hover:text-gray-50"
                >
                    Создать цель
                </Link>
            </nav>
            <div>Login</div>
        </div>
    );
}
