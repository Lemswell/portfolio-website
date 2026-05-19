import { allPosts } from "content-collections";
import BlogPostCard from "./BlogPostCard";
import React from "react";
 

interface BlogPostListProps {
  displayLim?: number; // max number of posts to display, default to all
  tags?: string[]; // filter posts by tags, default to all
}

export default function App({ displayLim, tags }: BlogPostListProps) {

  // let postsToDisplay = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  let postsToDisplay = displayLim !== undefined 
  ? allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, displayLim) 
  : allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (tags && tags.length > 0) {
    postsToDisplay = postsToDisplay.filter(post => post.tags.some(tag => tags.includes(tag)));
  }

  if (postsToDisplay.length === 0) {
    return (
      <p className="text-center text-zinc-500 dark:text-zinc-400">{`No posts as of yet :<`}</p>
    );
  }

  return (
      <ul className="rounded-md border border-black/10 dark:border-white/10 transition-colors duration-200">
        {postsToDisplay.map((post, index: number) => (
          <li key={post._meta.fileName}>
            <BlogPostCard post={post} />
            {index !== postsToDisplay.length - 1 && <hr className="border-black/10 dark:border-white/10" />}
          </li>
        ))}
      </ul>
  );
}