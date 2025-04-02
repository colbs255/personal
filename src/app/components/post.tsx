import { Doc } from "@/lib/doc";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import hljs from "highlight.js";
import highlightStyles from "./highlightjs.module.css";

function Code({ children, ...props }) {
    const language = props.className.replace("language-", "");
    const codeHTML = hljs.highlight(children, { language }).value;
    return <code className={highlightStyles.root} dangerouslySetInnerHTML={{ __html: codeHTML }} />;
}

const components = {
    h2: (props: any) => (
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
