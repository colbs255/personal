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
        <div>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                {doc.meta.title}
            </h1>
            <article className="prose">
                <Post {...doc} />
            </article>
        </div>
    );
}
