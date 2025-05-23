import Post from "@/app/components/post";
import Title from "@/app/components/title";
import type { Doc } from "@/lib/types";
import { formatLocalDate, formatPageTitle } from "@/lib/util";
import { getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

type Params = {
    slug: string;
};

export function generateStaticParams(): Params[] {
    return getPosts().map((doc) => ({ slug: doc.meta.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;
    const doc: Doc = getPosts().find((doc) => doc.meta.slug === slug) as Doc;
    return {
        title: formatPageTitle(doc.meta.title),
    };
}

export default async function Page({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const doc: Doc = getPosts().find((doc) => doc.meta.slug === slug) as Doc;
    if (!doc) {
        notFound();
    }

    return (
        <section>
            <Title subheading={formatLocalDate(doc.meta.publishedAt)}>
                {doc.meta.title}
            </Title>
            <article className="prose">
                <Post {...doc} />
            </article>
        </section>
    );
}
