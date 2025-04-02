import path from "path";
import fs from "fs";
import { Doc } from "@/lib/doc";
import { parseDoc } from "@/lib/util";

export function getWritings(): Doc[] {
    const filePath = path.join(process.cwd(), "content", "writings");
    const docs = fs
        .readdirSync(filePath, "utf8")
        .filter((f) => path.extname(f) === ".mdx")
        .map((f) => {
            const content = fs.readFileSync(path.join(filePath, f), "utf8");
            return parseDoc(content);
        });
    return docs;
}
