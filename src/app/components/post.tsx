import { Doc } from "@/lib/doc";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

const components = {
    h2: (props: any) => <h2 className="mb-8 text-xl font-semibold" {...props} />,
}

export default async function Page(doc: Doc) {
    // Compile the MDX source code to a function body
    const { default: MDXContent } = await evaluate(doc.content, runtime);

    return (
        <>
            <MDXContent components={components}/>
        </>
    );
}
