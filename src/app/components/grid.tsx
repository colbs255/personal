import { LocalDate } from "@/lib/doc";
import Link from "next/link";

export interface Item {
    name: string,
    date: LocalDate,
    tags: string[],
    href: string,
}

interface Props {
    items: Item[],
    openInNewTab?: boolean,
}

export default function Grid({ items, openInNewTab = false }: Props) {
    return <div>
    {items.map(item => (
        <Link
            key={item.name}
            className="flex flex-col space-y-1 mb-4"
            href={item.href}
            target={openInNewTab ? "_blank" : "_self"}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                    {item.name} { item.tags.length > 0 && item.tags.join(", ")}
                </p>
            </div>
        </Link>
    ))}
    </div>
}
