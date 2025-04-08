"use client";
import { Metadata } from "@/lib/types";
import { useEffect, useState } from "react";
import Grid, { Item } from "../components/grid";
import { compareLocalDate } from "@/lib/util";
import Title from "../components/title";

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
            <Title>Writings</Title>
            <Grid items={items} />
        </div>
    );
}
