import Link from "next/link";
import AuthWidget from "@/features/auth/ui/AuthWidget";
import NavBar from "@/widgets/NavBar";

export default function Header() {
    return (
        <header
            className="bg-gray-50 bg-opacity-50 backdrop-blur-lg flex justify-between items-center border-gray-400 border-[1px] rounded-full w-[70%]  mx-auto py-3 px-6 mt-5
		transition-all ease-in duration-600  hover:border-gray-500 fixed left-[50%] transform translate-x-[-50%] z-20 
		"
        >
            <div className="w-[10%] ">
                <Link href="/">
                    <h1 className="font-extrabold text-4xl text-gray-950">
                        FUX
                    </h1>
                </Link>
            </div>

            <div className="w-full h-[40px] ">
                <NavBar />
            </div>
            <div className="w-[10%] flex items-end justify-end">
                <AuthWidget />
            </div>
        </header>
    );
}
