import fs from "fs";
import path from "path";
import type { Doc } from "@/lib/types";
import { parseDoc } from "@/lib/util";

export function getPosts(): Doc[] {
    const filePath = path.join(process.cwd(), "content", "posts");
    const docs = fs
        .readdirSync(filePath, "utf8")
        .filter((f) => path.extname(f) === ".mdx")
        .map((f) => {
            const content = fs.readFileSync(path.join(filePath, f), "utf8");
            return parseDoc(content);
        });
    return docs;
}
