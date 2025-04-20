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

export default function generatePlantUmlSvg(source: string) {
    const hash = hashUmlCode(source);
    const outputFile = path.join(CACHE_DIR, `${hash}.svg`);
    const publicPath = `/diagrams/${hash}.svg`;

    // If it exists, return the public path
    if (fs.existsSync(outputFile)) {
        return publicPath;
    }

    // Write temp input file
    const inputFile = path.join(CACHE_DIR, `${hash}.uml`);
    fs.writeFileSync(inputFile, source);

    // Call PlantUML
    const args = ["-tsvg", inputFile]; // Use plantuml from PATH
    const result = spawnSync("plantuml", args);

    try {
        fs.unlinkSync(inputFile);
    } catch (err) {
        console.warn("Failed to delete temp file:", inputFile, err);
    }

    if (result.error) {
        throw new Error(`Failed to run PlantUML: ${result.error.message}`);
    }

    if (result.status !== 0) {
        throw new Error(`PlantUML exited with code ${result.status}: ${result.stderr}`);
    }

    return publicPath;
}
