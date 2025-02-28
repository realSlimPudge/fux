import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function PageLoader() {
    return (
        <div className="w-screen h-screen">
            <Backdrop
                open={true}
                sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            >
                <CircularProgress sx={{ color: "#000000" }} size={60} />
            </Backdrop>
        </div>
    );
}
