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
        console.log(node);
        const baseClasses = [
            "flex",
            "items-start",
            "gap-3",
            "rounded-md",
            "border",
            "p-4",
        ];
        const admonition = admonitionStyles[node.name]!;
        node.data = {
            hName: "div",
            hProperties: {
                className: [...baseClasses, admonition.backgroundColor, admonition.borderColor ],
            }
        };
        node.children.unshift({
            type: "paragraph",
            children: [{type: "text", value: "INFO"}],
            
        })
        console.log(node);
    });
}

function Test() {
    return (
        <div className="border border-blue-300 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-blue-500 text-white font-semibold px-4 py-2 text-sm">
                Info
            </div>
            <p>CAS is a form of non-locking synchronization. It is an atomic instruction that checks the current value and only applies the new value if the current value equals the expected value. CAS is generally more performant than traditional locks because it does not actually lock or reschedule threads on the CPU. Like everything else, CAS comes with trade-offs. Designing algorithms with CAS is more difficult than using a standard lock. They are actually less performant when contention is very high, but still faster in most real world cases.</p>
        </div>
    );
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

    return Test();
    return <div dangerouslySetInnerHTML={{ __html: String(html) }} />;
}
