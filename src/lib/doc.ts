export type Metadata = {
    title: string;
    slug: string;
    publishedAt: LocalDate;
    tags: string[];
};

export type Doc = {
    meta: Metadata;
    content: string;
};

export type LocalDate = {
    month: number;
    day: number;
    year: number;
};

export function formatDate(date: LocalDate): string {
    const month = String(date.month).padStart(2, "0");
    const day = String(date.day).padStart(2, "0");
    return `${date.year}-${month}-${day}`;
}
