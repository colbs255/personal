import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { DiagramPath } from "./types";

const CACHE_DIR = path.resolve("./public/diagrams");

// Make sure the cache dir exists
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function hashUmlCode(source: string) {
    return crypto.createHash("sha256").update(source).digest("hex");
}

export default function generatePlantUmlSvg(source: string): DiagramPath {
    const hash = hashUmlCode(source);
    // Write temp input file
    fs.mkdirSync(path.join(CACHE_DIR, hash), { recursive: true });
    const inputFile = path.join(CACHE_DIR, hash, "diagram.uml");
    fs.writeFileSync(inputFile, source);

    const generate = (theme: string, name: string) => {
        // Plantuml creates diagrams in same directory as input file
        // Specifying an '-o' will cause it to create the file in a subfolder
        const result = spawnSync("java", [
            "-Djava.awt.headless=true",
            "-jar",
            "plantuml.jar",
            "-Playout=smetana",
            "-tsvg",
            inputFile,
            "-theme",
            theme,
            "-o",
            name,
        ]);

        if (result.error) {
            throw new Error(`Failed to run PlantUML: ${result.error.message}`);
        }

        if (result.stderr && result.stderr.toString().trim()) {
            throw new Error(
                `PlantUML stderr: ${result.stderr.toString().trim()}`,
            );
        }
    };

    generate("cyborg", "dark");
    generate("materia", "light");

    return {
        hash,
        dark: `/diagrams/${hash}/dark/diagram.svg`,
        light: `/diagrams/${hash}/light/diagram.svg`,
    };
}
