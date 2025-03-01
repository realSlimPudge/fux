export default function GoalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="bg-gray-100 text-white w-screen h-screen">
            {/* <div className="solo-container">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 800 400"
                >
                    <path
                        d="M116.5919189453125,244.84303283691406C163.68309977213542,206.17039021809896,182.94767374674478,112.21524098714193,277.1300354003906,113.00447845458984C371.31239705403647,113.79371592203776,341.38115397135414,248.05977416992187,437.66815185546875,247.5336151123047C533.9551497395834,247.0074560546875,509.09417561848954,109.89535563151041,605.3811645507812,111.21075439453125C701.668153483073,112.52615315755209,718.8280786132813,210.7144911702474,765.9192504882812,252.01792907714844"
                        fill="none"
                        strokeWidth="10"
                        stroke='url("#SvgjsLinearGradient1003")'
                        strokeLinecap="round"
                        className="solo"
                        strokeOpacity="1"
                    ></path>
                    <defs>
                        <linearGradient
                            id="SvgjsLinearGradient1003"
                            gradientTransform="rotate(0, 0.5, 0.5)"
                        >
                            <stop stopColor="hsl(0, 0%, 21%)" offset="0"></stop>
                            <stop stopColor="hsl(0, 0%, 61%)" offset="1"></stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div> */}
            {children}
        </section>
    );
}
