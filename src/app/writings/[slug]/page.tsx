import Post from "@/app/components/post";
import { Doc } from "@/lib/doc";
import { getWritings } from "@/lib/writings";
import { notFound } from "next/navigation";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const doc: Doc = getWritings().find((doc) => doc.meta.slug === slug) as Doc;
    if (!doc) {
        notFound();
    }

    return (
        <section>
            <h1 className="title font-semibold text-2xl tracking-tighter">
                {doc.meta.title}
            </h1>
            <div className="flex justify-between items-center mt-2 mb-8 text-sm">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {doc.meta.publishedAt}
                </p>
            </div>
            <article className="prose">
                <Post {...doc} />
            </article>
        </section>
    );
}
