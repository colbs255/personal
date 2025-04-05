import Asciidoctor from "asciidoctor";
// @ts-expect-error: lib does not have ts types and I can't figure out how to make ts happy
import * as reveal from "@asciidoctor/reveal.js";
import fs from "fs";
import path from "path";
import { slugify } from "@/lib/util";

const root = process.cwd();
const talksDir = path.join(root, "content", "talks");
const outputDir = path.join(root, "public", "talks");
fs.mkdirSync(outputDir, { recursive: true });
fs.cpSync(
    path.join(root, "node_modules", "reveal.js", "dist"),
    path.join(outputDir, "reveal.js", "dist"),
    { recursive: true },
);
fs.cpSync(
    path.join(root, "node_modules", "reveal.js", "plugin"),
    path.join(outputDir, "reveal.js", "plugin"),
    { recursive: true },
);

const asciidoctor = Asciidoctor();
reveal.register();

const attributes = [
    "source-highlighter=highlightjs",
    "revealjs_theme=white",
    "source-highlighter=highlightjs",
    "table-caption!",
    "revealjs_margin=.05",
    "revealjs_height=800",
    "revealjs_width=1000",
    "revealjsdir=reveal.js",
];

const slugMap: Record<string, string> = {};
fs.readdirSync(talksDir).forEach((f) => {
    const doc = asciidoctor.loadFile(path.join(talksDir, f), {
        safe: "safe",
        backend: "revealjs",
        standalone: true,
        attributes: attributes,
    });
    const title = doc.getTitle() ?? "unknown";
    const slug = slugify(title) + ".html";
    slugMap[slug] = title;
    fs.writeFileSync(path.join(outputDir, slug), doc.convert());
});

fs.writeFileSync(
    path.join(root, "public", "talks", "index.json"),
    JSON.stringify(slugMap),
);
