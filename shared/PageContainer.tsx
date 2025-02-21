import { ReactElement } from "react";

type ContainerProps = {
    children: ReactElement;
};

export default function PageContainer({ children }: ContainerProps) {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            {children}
        </div>
    );
}
