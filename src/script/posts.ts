import fs from "fs";
import path from "path";

import { parseDoc } from "@/lib/util";
import { Metadata } from "@/lib/types";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");

const items: Metadata[] = fs.readdirSync(postsDir).map((f) => {
    const rawDoc = fs.readFileSync(path.join(postsDir, f), "utf-8");
    return parseDoc(rawDoc).meta;
});

const outputDir = path.join(root, "public", "posts");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
    path.join(outputDir, "index.json"),
    JSON.stringify({ data: items }),
);
