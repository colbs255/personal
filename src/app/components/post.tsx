import { Doc } from "@/lib/doc";
import styles from "./post.module.css";

export default function Page(doc: Doc) {
    return (
        <div
            className={styles.post}
            dangerouslySetInnerHTML={{ __html: doc.content }}
        />
    );
}
