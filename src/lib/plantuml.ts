import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const CACHE_DIR = path.resolve("./public/diagrams");

// Make sure the cache dir exists
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function hashUmlCode(source: string) {
    return crypto.createHash("sha256").update(source).digest("hex");
}

type DiagramPath = {
    dark: string;
    light: string;
}

export default function generatePlantUmlSvg(source: string): DiagramPath {
    const hash = hashUmlCode(source);
    // Write temp input file
    fs.mkdirSync(path.join(CACHE_DIR, hash), { recursive: true });
    const inputFile = path.join(CACHE_DIR, hash, "diagram.uml");
    fs.writeFileSync(inputFile, source);

    // Call PlantUML
    const outputFile = path.join(CACHE_DIR, hash);
    const darkResult = spawnSync("plantuml", ["-tsvg", inputFile, "-theme", "cyborg", "-o", "dark"]);
    const lightResults = spawnSync("plantuml", ["-tsvg", inputFile, "-o", "light"]);

    return {
        dark: `/diagrams/${hash}/dark/diagram.svg`,
        light: `/diagrams/${hash}/light/diagram.svg`,
    }

    // // If it exists, return the public path
    // if (fs.existsSync(outputFile)) {
    //     return publicPath;
    // }
    //
    // // Write temp input file
    // const inputFile = path.join(CACHE_DIR, `${hash}.uml`);
    // fs.writeFileSync(inputFile, source);
    //
    // // Call PlantUML
    // const args = ["-tsvg", inputFile]; // Use plantuml from PATH
    // const result = spawnSync("plantuml", args);
    //
    // try {
    //     fs.unlinkSync(inputFile);
    // } catch (err) {
    //     console.warn("Failed to delete temp file:", inputFile, err);
    // }
    //
    // if (result.error) {
    //     throw new Error(`Failed to run PlantUML: ${result.error.message}`);
    // }
    //
    // if (result.stderr && result.stderr.toString().trim()) {
    //     throw new Error(`PlantUML stderr: ${result.stderr.toString().trim()}`);
    // }
    //
    // return publicPath;
}
