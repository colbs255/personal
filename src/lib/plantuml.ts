import { spawn } from "child_process";
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

export default async function generatePlantUmlSvg(source: string) {
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
    const proc = spawn("plantuml", args);

    await new Promise<void>((resolve, reject) => {
        proc.on("close", (code) => {
            fs.unlinkSync(inputFile); // Clean up temp input file
            if (code !== 0) {
                return reject(new Error(`PlantUML exited with code ${code}`));
            }
            resolve();
        });

        proc.stderr.on("data", (data) => {
            console.error("PlantUML stderr:", data.toString());
        });
    });

    return publicPath;
}
