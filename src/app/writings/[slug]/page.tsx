import Post from "@/app/components/post";
import { Doc, getWritings } from "../posts";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const doc: Doc = getWritings().find(doc => doc.slug === slug) ?? {title: "unknown", slug: slug, content: ""};
  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {doc.title}
      </h1>
      <Post {...doc} />
    </div>
  );
}
