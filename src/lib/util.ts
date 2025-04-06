import { Doc, Metadata, LocalDate } from "./types";

function parseLocalDate(s: string): LocalDate {
    const [year, month, day] = s.split("-").map(Number);
    return { year, month, day };
}

export function formatDate(date: LocalDate): string {
    const month = String(date.month).padStart(2, "0");
    const day = String(date.day).padStart(2, "0");
    return `${date.year}-${month}-${day}`;
}

export function slugify(title: string): string {
    return title
        .toString()
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
        .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function parseDoc(fileContent: string): Doc {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContent);
    const content = fileContent.replace(frontmatterRegex, "").trim();
    const frontMatterLines = match![1].trim().split("\n");

    const result: Record<string, string> = {};
    frontMatterLines.forEach((line) => {
        const components = line.split(": ");
        const [key, value] = [components[0], components[1]];
        result[key] = value;
    });
    const meta: Metadata = {
        title: result["title"],
        slug: slugify(result["title"]),
        tags: result["tags"].split(", "),
        publishedAt: parseLocalDate(result["publishedAt"]),
    };
    return { meta, content };
}
