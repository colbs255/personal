import React from "react";

type TitleProps = {
    children: React.ReactNode;
};

export default function Title({ children }: TitleProps) {
    return (
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
            {children}
        </h1>
    );
}
