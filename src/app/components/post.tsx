import { Doc } from "@/lib/types";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

function Info(props: AdmonitionProps) {
    return Admonition(
        {
            defaultTitle: "Info",
            titleColor: "bg-blue-700",
            borderColor: "border-blue-400",
        },
        props,
    );
}

function Warning(props: AdmonitionProps) {
    return Admonition(
        {
            defaultTitle: "Warning",
            titleColor: "bg-yellow-700",
            borderColor: "border-yellow-400",
        },
        props,
    );
}

type AdmonitionProps = {
    title?: string;
    children: React.ReactNode;
};

type AdmonitionSchema = {
    defaultTitle: string;
    titleColor: string;
    borderColor: string;
};

function Admonition(schema: AdmonitionSchema, props: AdmonitionProps) {
    return (
        <div
            className={`border-2 ${schema.borderColor} rounded-lg overflow-hidden shadow-sm mb-2`}
        >
            <div
                className={`${schema.titleColor} text-white font-semibold px-4 py-2 text-sm`}
            >
                {props.title ?? schema.defaultTitle}
            </div>
            <div className="px-3">{props.children}</div>
        </div>
    );
}

function mdxComponents() {
    return {
        Info,
        Warning,
    };
}

export default async function Page(doc: Doc) {
    const { default: MDXContent } = await evaluate(doc.content, {
        ...runtime,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
        useMDXComponents: mdxComponents,
    });
    return <MDXContent />;
}
