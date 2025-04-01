import path from "path";
import fs from "fs";
import Asciidoctor from "asciidoctor";
import { Doc } from "@/lib/doc";
import { slugify } from "@/lib/util";

export function getWritings(): Doc[] {
    const asciidoctor = Asciidoctor();
    const filePath = path.join(process.cwd(), "content", "writings");
    const docs = fs.readdirSync(filePath, "utf8").map((f) => {
        const doc = asciidoctor.loadFile(filePath + "/" + f);
        return {
            meta: {
                title: doc.getTitle() ?? "unknown",
                slug: slugify(doc.getTitle() ?? "unknown"),
                tags: doc.getAttribute("tags", "").split(", "),
            },
            content: doc.convert(),
        };
    });
    return docs;
}
