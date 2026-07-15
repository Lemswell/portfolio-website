"use client";

import BlogPostCard from "./BlogPostCard";
import Link from "next/link";
import { useState } from "react";
import { Posts } from "@/types/content";
// not actually importing post filter function because assume parent function imports it

interface BlogPostListProps {
  posts: Posts;
  displayLim?: number; // max number of posts to display, default to all;
}

export default function BlogPostListDisplay({
  posts,
  displayLim,
}: BlogPostListProps) {
  // let postsToDisplay = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // copy before sorting to avoid mutating the shared `allPosts` array

  // get from filtered posts (todo: pass responsibility to parent function lib/posts.ts/filteredPosts)
  // why doesn't this work when using `posts.reverse()` or `posts = posts.reverse()`

  const [displayAmount, setDisplayAmount] = useState(displayLim ?? null);

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div
        role="list"
        className={`border border-black/10 dark:border-white/10
          rounded-t-md
          ${displayAmount == undefined || displayAmount >= posts.length ? "rounded-b-md" : ""}
          dark:bg-background dark:hover:bg-background bg-zinc-50`}
      >
        {posts.map(
          (post, index: number) =>
            index < (displayAmount ?? posts.length) && (
              <div role="listitem" key={post._meta.fileName}>
                {index !== 0 && (
                  <hr className="border-black/10 dark:border-white/10" />
                )}
                <BlogPostCard
                  post={post}
                  first={index === 0}
                  last={index >= posts.length - 1}
                />
              </div>
            ),
        )}
      </div>

      {displayAmount && (
        <div
          className={`${displayAmount >= posts.length ? "size-fit self-center" : ""} max-w-full flex items-center text-sm text-zinc-800/60 dark:text-zinc-100/60 tracking-normal font-medium font-mono
          rounded-b-md border border-t-0 border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-background `}
        >
          {displayAmount < posts.length && (
            <>
              <div
                className={`${displayAmount >= posts.length ? "size-fit self-center" : ""}
                grow flex justify-between py-1 px-4 line-clamp-1
                rounded-bl-md
                cursor-pointer hover:bg-zinc-500/10 transition-colors duration-200`}
                onClick={() =>
                  setDisplayAmount(
                    displayAmount + 3 > posts.length
                      ? posts.length
                      : displayAmount + 3,
                  )
                }
              >
                <span>{`see more`}</span>
                <div className="rotate-90 font-black">{`\u27e9`}</div>
              </div>
              {/* vertical break (like hr) */}
              <div className="border-l h-7 border-black/10 dark:border-white/10"></div>
            </>
          )}
          <Link
            href="/blog"
            className={`py-1 px-4 line-clamp-1
              hover:bg-zinc-500/10 hover:text-blue-900 dark:hover:text-blue-300
              transition-colors duration-200 ${displayAmount >= posts.length ? "rounded-b-md" : "rounded-br-md"}`}
          >
            {`all `}
            <span
              className={`${displayAmount < posts.length ? "hidden" : ""} sm:inline`}
            >{`blog posts`}</span>
            {` \u2192`}
          </Link>
        </div>
      )}
    </div>
  );
}
