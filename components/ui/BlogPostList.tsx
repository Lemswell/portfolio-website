import { allPosts } from "content-collections";
import BlogPostCard from "./BlogPostCard";
import Link from "next/link";

interface BlogPostListProps {
  displayLim?: number; // max number of posts to display, default to all
  tags?: string[]; // filter posts by tags, default to all
}

export default function App({ displayLim, tags }: BlogPostListProps) {
  // let postsToDisplay = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // copy before sorting to avoid mutating the shared `allPosts` array
  let postsToDisplay =
    displayLim !== undefined
      ? [...allPosts]
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, displayLim)
      : [...allPosts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

  if (tags && tags.length > 0) {
    postsToDisplay = postsToDisplay.filter((post) =>
      post.tags.some((tag) => tags.includes(tag)),
    );
  }

  if (postsToDisplay.length === 0) {
    return (
      <p className="text-center text-zinc-500 dark:text-zinc-400">{`No posts as of yet :<`}</p>
    );
  }

  return (
    <>
      <div
        role="list"
        className="rounded-md border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-background dark:hover:bg-background"
      >
        {postsToDisplay.map((post, index: number) => (
          <div role="listitem" key={post._meta.fileName}>
            <BlogPostCard post={post} />
            {index !== postsToDisplay.length - 1 && (
              <hr className="border-black/10 dark:border-white/10" />
            )}
          </div>
        ))}
      </div>
      {displayLim && (
        <Link
          href="/blog"
          className="py-1 px-4 size-fit line-clamp-1 self-center
          text-sm text-zinc-800/60 dark:text-zinc-100/60 tracking-normal
          font-medium font-mono hover:text-blue-900 dark:hover:text-blue-300
          rounded-b-md border border-t-0 border-black/10 dark:border-white/10
          bg-zinc-50 dark:bg-background dark:hover:bg-background
          hover:bg-zinc-500/10 transition-colors duration-200"
        >{`all blog posts \u2192`}</Link>
      )}
    </>
  );
}
