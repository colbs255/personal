import fs from "fs";
import path from "path";
import Grid, { Item } from "../components/grid";
import { Metadata } from "@/lib/types";
import { compareLocalDate } from "@/lib/util";

export default function Page() {
    const filePath = path.join(process.cwd(), "public", "slides", "index.json");
    const index: Metadata[] = JSON.parse(
        fs.readFileSync(filePath, "utf8"),
    ).data;
    const items: Item[] = index
        .map((v) => ({
            name: v.title,
            date: v.publishedAt,
            href: `/slides/${v.slug}`,
            tags: v.tags,
        }))
        .sort((a, b) => compareLocalDate(b.date, a.date));
    return (
        <div>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                Slides
            </h1>
            <Grid items={items} openInNewTab={true} />
        </div>
    );
}
