import fs from "fs";
import path from "path";
import { Metadata } from "@/lib/types";
import Grid, { Item } from "../components/grid";
import { compareLocalDate } from "@/lib/util";
import Title from "../components/title";

export default function Page() {
    const filePath = path.join(process.cwd(), "public", "posts", "index.json");
    const posts: Metadata[] = JSON.parse(
        fs.readFileSync(filePath, "utf8"),
    ).data;
    const items: Item[] = posts
        .map((v: Metadata) => ({
            name: v.title,
            date: v.publishedAt,
            href: `/posts/${v.slug}`,
            tags: v.tags,
        }))
        .sort((a, b) => compareLocalDate(b.date, a.date));
    return (
        <div>
            <Title>Posts</Title>
            <Grid items={items} />
        </div>
    );
}
