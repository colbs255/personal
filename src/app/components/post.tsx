import { Doc } from "@/lib/types";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import PlantUML from "./plantuml";
import Admonition, { AdmonitionProps } from "./admonition";

function mdxComponents() {
    const t = "";
    return {
        PlantUML,
        Info: (props: AdmonitionProps) =>
            Admonition(
                {
                    defaultTitle: "Info",
                    titleColor: "bg-blue-700",
                    borderColor: "border-blue-400",
                },
                props,
            ),
        Warning: (props: AdmonitionProps) =>
            Admonition(
                {
                    defaultTitle: "Warning",
                    titleColor: "bg-yellow-700",
                    borderColor: "border-yellow-400",
                },
                props,
            ),
        Note: (props: AdmonitionProps) =>
            Admonition(
                {
                    defaultTitle: "Note",
                    titleColor: "bg-green-700",
                    borderColor: "border-green-400",
                },
                props,
            ),
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
