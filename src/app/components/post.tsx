import { Doc } from "@/lib/types";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

type AdmonitionProps = {
    title?: string;
    children: React.ReactNode;
};

enum AdmonitionType {
    Info,
    Warning,
};

type AdmonitionSchema = {
    defaultTitle: string,
    backgroundColor: string,
};

const admonitions: Record<AdmonitionType, AdmonitionSchema> = {
    [AdmonitionType.Info]: {
        defaultTitle: "Info",
        backgroundColor: "bg-blue-500",
    },
    [AdmonitionType.Warning]: {
        defaultTitle: "Warning",
        backgroundColor: "bg-blue-500",
    },
}

function Admonition(schema: AdmonitionSchema, props: AdmonitionProps) {
    return (
        <div className="border border-blue-300 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-blue-500 text-white font-semibold px-4 py-2 text-sm">
                {props.title ?? schema.defaultTitle}
            </div>
            {props.children}
        </div>
    );
}

function mdxComponents() {
    return {
        Info: (props: AdmonitionProps) => Admonition(admonitions[AdmonitionType.Info], props),
        Warning: (props: AdmonitionProps) => Admonition(admonitions[AdmonitionType.Warning], props),
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
