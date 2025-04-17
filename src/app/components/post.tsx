import { Doc } from "@/lib/types";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import { Root } from "mdast";

type Admonition = {
  borderColor: string;
  backgroundColor: string;
  icon: string;
};

const admonitionStyles: Record<string, Admonition> = {
  info: {
    borderColor: "border-blue-600",
    backgroundColor: "bg-blue-950",
    icon: "ℹ️"
  },
  warning: {
    borderColor: "border-yellow-600",
    backgroundColor: "bg-yellow-900",
    icon: "⚠️"
  },
};


function admonitionTransform(tree: Root) {
    visit(tree, (node) => {
        if (
            node.type !== "containerDirective" &&
            node.type !== "leafDirective"
        ) {
            return;
        }
        if (!(node.name in admonitionStyles)) {
            return;
        }
        node.data ??= {};
        node.data.hName = "div";
        const baseClasses = [
            "flex",
            "items-start",
            "gap-3",
            "rounded-md",
            "border",
            "p-4",
        ];
        const admonition = admonitionStyles[node.name]!;
        node.data.hProperties = {
            className: [...baseClasses, admonition.backgroundColor, admonition.borderColor ],
        };
    });
}

export default async function Page(doc: Doc) {
    const html = await unified()
        .use(remarkParse)
        .use(remarkDirective)
        .use(() => admonitionTransform)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(doc.content);

    return <div dangerouslySetInnerHTML={{ __html: String(html) }} />;
}
