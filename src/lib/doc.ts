export type Metadata = {
    title: string;
    slug: string;
    tags: string[];
};

export type Doc = {
    meta: Metadata;
    content: string;
};
