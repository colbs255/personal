"use client";
import { Metadata } from "@/lib/types";
import { useEffect, useState } from "react";
import Grid, { Item } from "../components/grid";
import { compareLocalDate } from "@/lib/util";

export default function Page() {
    const [posts, setDocs] = useState<Metadata[]>([]);

    useEffect(() => {
        fetch("writings/index.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch JSON");
                }
                return response.json();
            })
            .then((jsonData) => {
                setDocs(jsonData.data);
            });
    }, []);

    const items: Item[] = posts
        .map((v: Metadata) => ({
            name: v.title,
            date: v.publishedAt,
            href: `/writings/${v.slug}`,
            tags: v.tags,
        }))
        .sort((a, b) => compareLocalDate(b.date, a.date));
    return (
        <div>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                Writings
            </h1>
            <Grid items={items} />
        </div>
    );
}
