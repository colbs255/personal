import Grid, { type Item } from "../components/grid";
import { compareLocalDate, formatPageTitle } from "@/lib/util";
import Title from "../components/title";
import { getPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: formatPageTitle("Posts"),
};

export default function Page() {
    const posts = getPosts();
    const items: Item[] = posts
        .map((post) => post.meta)
        .map((v) => ({
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
