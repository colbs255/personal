import fs from "fs";
import path from "path";
import Grid, { Item } from "../components/grid";
import { Metadata } from "@/lib/types";
import { compareLocalDate } from "@/lib/util";
import Title from "../components/title";

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
            <Title>Slides</Title>
            <Grid items={items} openInNewTab={true} />
        </div>
    );
}
