import { Doc } from "../writings/posts";
import styles from "./post.module.css"

export default function Page(doc: Doc) {
   return (
    <div className={styles.post} dangerouslySetInnerHTML={{ __html: doc.content }} />
  );
}
