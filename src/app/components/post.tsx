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
};

function mdxComponents() {
    return {
        PlantUML: ({ source }: PlantUMLProps) => (
            <PlantUML path={generatePlantUmlSvg(source)} />
        ),
        Note: (props: AdmonitionProps) =>
            Admonition(
                {
                    defaultTitle: "Note",
                    titleColor: "bg-[#448aff]/15",
                    borderColor: "border-[#448aff]",
                },
                props,
            ),
        Info: (props: AdmonitionProps) =>
            Admonition(
                {
                    defaultTitle: "Info",
                    titleColor: "bg-[#00b8d4]/15",
                    borderColor: "border-[#00b8d4]",
                },
                props,
            ),
        Warning: (props: AdmonitionProps) =>
            Admonition(
                {
                    defaultTitle: "Warning",
                    titleColor: "bg-[#ff9100]/15",
                    borderColor: "border-[#ff9100]",
                },
                props,
            ),
    };
}

const shikiConfig: RehypeShikiOptions = {
    inline: "tailing-curly-colon",
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
