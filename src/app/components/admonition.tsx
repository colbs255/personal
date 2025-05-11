export type AdmonitionProps = {
    title?: string;
    children: React.ReactNode;
};

export type AdmonitionSchema = {
    defaultTitle: string;
    titleColor: string;
    borderColor: string;
};

export default function Admonition(
    schema: AdmonitionSchema,
    props: AdmonitionProps,
) {
    return (
        <div
            className={`border-2 ${schema.borderColor} rounded-lg overflow-hidden shadow-sm mb-2`}
        >
            <div
                className={`${schema.titleColor} text-black dark:text-white font-semibold px-4 py-2 text-sm`}
            >
                {props.title ?? schema.defaultTitle}
            </div>
            <div className="p-3">{props.children}</div>
        </div>
    );
}
