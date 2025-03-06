import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutBtn() {
    return (
        <>
            <button
                onClick={() => signOut()}
                className="bg-gray-50 border-[1px] border-gray-300 rounded-3xl p-4 py-2 text-gray-600 shadow-sm hover:bg-red-100 hover:border-red-100
                transition-all ease duration-300"
            >
                <LogoutIcon fontSize="small" className="mb-1 mr-2" />
                <span className="font-bold">Выйти</span>
            </button>
        </>
    );
}
