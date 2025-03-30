import Link from 'next/link'
import { getWritings } from './posts';

export default function Page() {
  const posts = getWritings();
  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Writings
      </h1>
      <div>
        {posts.map(v => (
          <Link
            key={v.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/writings/${v.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {v.title} {v.tags.join(",")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
