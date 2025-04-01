import fs from "fs";
import path from "path";

import { parseDoc } from "@/lib/util";
import { Metadata } from "@/lib/doc";

const root = process.cwd();
const talksDir = path.join(root, "content", "writings");

const items: Metadata[] = [];
fs.readdirSync(talksDir).forEach((f) => {
    const rawDoc = fs.readFileSync(path.join(talksDir, f), "utf-8");
    items.push(parseDoc(rawDoc).meta);
});

fs.writeFileSync(
    path.join(root, "public", "writings", "index.json"),
    JSON.stringify({ "data": items}),
);
