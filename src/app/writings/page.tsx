"use client";
import Link from "next/link";
import { Metadata } from "@/lib/doc";
import { useEffect, useState } from "react";
import Input from "../components/input";

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

    return (
        <div>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                Writings
            </h1>
            <Input placeholder="Filter..." onChange={setSearchTerm} />
            <div>
                {posts
                    .filter((v) => v.title.toLowerCase().includes(searchTerm))
                    .map((v) => (
                        <Link
                            key={v.slug}
                            className="flex flex-col space-y-1 mb-4"
                            href={`/writings/${v.slug}`}
                        >
                            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                                    {v.title} {v.tags.join(",")}
                                </p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
