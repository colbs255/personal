export type Metadata = {
    title: string;
    slug: string;
    publishedAt: string;
    tags: string[];
};

export type Doc = {
    meta: Metadata;
    content: string;
};
