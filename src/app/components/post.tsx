import { Doc } from "@/lib/types";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

type AdmonitionProps = {
    title?: string;
    children: React.ReactNode;
};

function Info(props: AdmonitionProps) {
    return (
        <div className="border border-blue-300 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-blue-500 text-white font-semibold px-4 py-2 text-sm">
                {props.title ?? "Info"}
            </div>
            {props.children}
        </div>
    );
}

function mdxComponents() {
    return { Info };
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
