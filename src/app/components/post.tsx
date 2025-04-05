import { Doc } from "@/lib/doc";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import hljs from "highlight.js";
import { HTMLAttributes } from "react";

type Props = {
    children: string;
} & HTMLAttributes<HTMLElement>;

function Code({ children, className = "", ...props }: Props) {
    const language = className.replace("language-", "");
    const codeHTML = hljs.highlight(children, { language }).value;
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

const components = {
    h2: (props: Props) => (
        <h2 className="mb-8 text-xl font-semibold" {...props} />
    ),
    code: Code,
};

export default async function Page(doc: Doc) {
    // Compile the MDX source code to a function body
    const { default: MDXContent } = await evaluate(doc.content, runtime);

    return (
        <>
            <MDXContent components={components} />
        </>
    );
}
