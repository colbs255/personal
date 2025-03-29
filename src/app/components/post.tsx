import { Doc } from "../writings/posts";

export default function Page(doc: Doc) {
   return (
    <div dangerouslySetInnerHTML={{ __html: doc.content }} />
  );
}
