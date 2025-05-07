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

export type DiagramPath = {
    hash: string;
    dark: string;
    light: string;
};
