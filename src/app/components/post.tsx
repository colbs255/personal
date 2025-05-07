import { Doc } from "@/lib/types";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeShiki, { RehypeShikiOptions } from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import PlantUML from "./plantuml";
import Admonition, { AdmonitionProps } from "./admonition";
import generatePlantUmlSvg from "@/lib/plantuml";

type PlantUMLProps = {
    source: string;
}

function mdxComponents() {
    return {
        PlantUML: ({ source }: PlantUMLProps) => <PlantUML path={generatePlantUmlSvg(source)} />,
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

const shikiConfig: RehypeShikiOptions = {
    themes: {
        light: "catppuccin-latte",
        dark: "tokyo-night",
    },
};

export default async function Page(doc: Doc) {
    const { default: MDXContent } = await evaluate(doc.content, {
        ...runtime,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypeShiki, shikiConfig]],
        useMDXComponents: mdxComponents,
    });
    return <MDXContent />;
}
