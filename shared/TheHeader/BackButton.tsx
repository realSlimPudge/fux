"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    const pathname = usePathname();

    const isProfilePage = /^\/profile\/[^/]+$/.test(pathname);

    if (!isProfilePage) {
        return null;
    }

    const handleBack = () => {
        if (window.history.length > 2) {
            router.back();
        } else {
            router.push("/");
        }
    };
    return (
        <button
            onClick={handleBack}
            className="text-gray-600 sm:hidden flex items-center font-semibold"
        >
            <ArrowBackIosIcon fontSize="small" /> Назад
        </button>
    );
}
