import { allPosts } from "content-collections";
import TagList from "@/components/ui/TagList";
import Calendar from "@/components/ui/icons/Calendar";
import { formatDate } from "@/lib/formatDate";
import { notFound } from "next/navigation";
import Link from "next/link";

const PostPageDisplay = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const constIdx = allPosts.findIndex((post) => {
    return post._meta.fileName === `${slug}.md`;
  });
  const post = allPosts[constIdx];

  // const idx = allPosts.indexOf(post);
  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="my-8">
        <section>
          <span className="text-xl sm:text-2xl font-bold">
            <Link
              href={`/projects/${post.grouping}`}
              className="text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
            >
              {`${post.grouping}`.charAt(0).toUpperCase() +
                `${post.grouping}`.slice(1)}
            </Link>
            {"\u00A0/\u00A0"}
            <Link
              href={`/blog`}
              className="text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
            >
              {`Blog\u00A0Post`}
            </Link>
          </span>
          <h1 className="pb-1 text-5xl sm:text-6xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
            {post.title}
          </h1>
        </section>

        <section className="mt-3 flex flex-col gap-2">
          <div className="my-1 flex items-center gap-2 text-zinc-500/80 dark:text-zinc-400/80">
            <Calendar className="w-4 h-4" />
            <span className="text-xs">{formatDate(post.date)}</span>
          </div>
          <p className="text-md line-clamp-2">
            {post.tldr ? post.tldr : post.compiledContent}
          </p>
          <TagList
            tags={
              post.tags.includes(post.grouping)
                ? post.tags
                : [post.grouping].concat(post.tags)
            }
          />
        </section>
      </header>

      <hr className="border-black/10 dark:border-white/10" />

      {post && (
        <article
          dangerouslySetInnerHTML={{ __html: post.compiledContent }}
          className="prose sm:prose-lg dark:prose-invert mt-3 mx-auto max-w-6xl py-6
      prose-headings:font-semibold"
        />
      )}
      <hr className="border-black/10 dark:border-white/10" />
      <div className="my-8 flex justify-between items-center">
        {constIdx - 1 >= 0 && (
          <Link
            href={`/blog/${allPosts[constIdx - 1]._meta.fileName}`.slice(0, -3)}
            className="grow text-left text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
          >
            {`previous`}
          </Link>
        )}
        {constIdx + 1 < allPosts.length && (
          <Link
            href={`/blog/${allPosts[constIdx + 1]._meta.fileName}`.slice(0, -3)}
            className="grow text-right text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
          >
            {`next`}
          </Link>
        )}
      </div>
    </main>
  );
};

export default PostPageDisplay;
