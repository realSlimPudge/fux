import Link from "next/link";
import AuthWidget from "@/features/auth/ui/AuthWidget";
import NavBar from "@/widgets/NavBar";

export default function Header() {
    return (
        <header
            className="sm:bg-gray-50 bg-opacity-50 sm:backdrop-blur-lg flex sm:justify-between items-center border-gray-400 sm:border-[1px] 
            rounded-full sm:w-[70%]  mx-auto py-3 sm:px-6 sm:mt-5 transition-all ease-in duration-600  hover:border-gray-500 fixed left-[50%] 
		transform translate-x-[-50%] z-20 border-0 bg-none backdrop-filter-none px-0 w-[90%] justify-end mt-2
		"
        >
            {/* пк   */}
            <div className="w-[10%] sm:block hidden ">
                <Link href="/">
                    <h1 className="font-extrabold text-4xl text-gray-950">
                        FUX
                    </h1>
                </Link>
            </div>

            <div className="w-full h-[40px] sm:block hidden">
                <NavBar />
            </div>
            <div className="w-[10%] flex items-end justify-end">
                <AuthWidget />
            </div>
        </header>
    );
}
