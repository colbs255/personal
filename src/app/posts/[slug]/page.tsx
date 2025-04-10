import Post from "@/app/components/post";
import Title from "@/app/components/title";
import { Doc } from "@/lib/types";
import { formatLocalDate } from "@/lib/util";
import { getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

type Params = {
    slug: string;
};

export function generateStaticParams(): Params[] {
    return getPosts().map((doc) => ({ slug: doc.meta.slug }));
}

export default async function Page({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const doc: Doc = getPosts().find((doc) => doc.meta.slug === slug) as Doc;
    if (!doc) {
        notFound();
    }

    return (
        <section>
            <Title>{doc.meta.title}</Title>
            <div className="flex justify-between items-center mt-2 mb-8 text-sm">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {formatLocalDate(doc.meta.publishedAt)}
                </p>
            </div>
            <article className="prose">
                <Post {...doc} />
            </article>
        </section>
    );
}
