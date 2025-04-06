import fs from "fs";
import path from "path";
import Grid, { Item } from "../components/grid";
import { LocalDate } from "@/lib/types";

export default function Page() {
    const filePath = path.join(process.cwd(), "public", "talks", "index.json");
    const index: Record<string, string> = JSON.parse(
        fs.readFileSync(filePath, "utf8"),
    );
    const date: LocalDate = { month: 1, day: 1, year: 2026 };
    const items: Item[] = Object.entries(index).map(([slug, name]) => ({
        name,
        date,
        href: `/talks/${slug}`,
        tags: [],
    }));
    return (
        <div>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                Talks
            </h1>
            <p className="mb-4">Some of my talks:</p>
            <Grid items={items} openInNewTab={true} />
        </div>
    );
}
