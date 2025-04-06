"use client";
import { Metadata } from "@/lib/doc";
import { useEffect, useState } from "react";
import Input from "../components/input";
import Grid, { Item } from "../components/grid";

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
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
        .filter((v: Metadata) => v.title.toLowerCase().includes(searchTerm))
        .map((v: Metadata) => ({ name: v.title, date: v.publishedAt, href: `/writings/${v.slug}`, tags: v.tags}));
    return (
        <div>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                Writings
            </h1>
            <Input placeholder="Filter..." onChange={setSearchTerm} />
            <Grid items={items}/>
        </div>
    );
}
