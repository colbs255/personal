import type React from "react";

type TitleProps = {
    subheading?: string;
    children: React.ReactNode;
};

export default function Title(props: TitleProps) {
    return (
        <div className="mb-8">
            <h1>{props.children}</h1>
            {props.subheading && (
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    {props.subheading}
                </p>
            )}
        </div>
    );
}
