import path from "path";
import fs from "fs";
import Asciidoctor from "asciidoctor";

const asciidoctor = Asciidoctor();

export type Doc = {
  title: string,
  slug: string,
  content: string,
  tags: string[],
};

export function getWritings(): Doc[] {
  const filePath = path.join(process.cwd(), "content", "writings");
  const docs = fs.readdirSync(filePath, "utf8").map(f => {
    const doc = asciidoctor.loadFile(filePath + "/" + f);
    return {
      title: doc.getTitle() ?? "unknown",
      slug: slugify(doc.getTitle() ?? "unknown"),
      content: doc.convert(),
      tags: doc.getAttribute("tags", "").split(", "),
    };
  });
  return docs;
}

export function slugify(title: string): string {
  return title
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}
