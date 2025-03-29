import fs from "fs";
import path from "path";
import Link from 'next/link'

export default function Page() {
  const filePath = path.join(process.cwd(), "public", "talks", "index.json");
  const index = JSON.parse(fs.readFileSync(filePath, "utf8"))
  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Talks
      </h1>
       <p className="mb-4">
        {`Some of my talks:`}
      </p>
      <div>
        {Object.entries(index).map(([slug, title]) => (
          <Link
            key={slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/talks/${slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
