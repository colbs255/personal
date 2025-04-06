import fs from "fs";
import path from "path";

import { parseDoc } from "@/lib/util";
import { Metadata } from "@/lib/types";

const root = process.cwd();
const writingsDir = path.join(root, "content", "writings");

const items: Metadata[] = fs.readdirSync(writingsDir).map((f) => {
    const rawDoc = fs.readFileSync(path.join(writingsDir, f), "utf-8");
    return parseDoc(rawDoc).meta;
});

const outputDir = path.join(root, "public", "writings");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
    path.join(outputDir, "index.json"),
    JSON.stringify({ data: items }),
);
