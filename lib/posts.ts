import { allPosts } from "content-collections";

export type Posts = typeof allPosts;

export const filteredPosts = (tags?: string[]): typeof allPosts => {
  if (!tags || tags.length === 0) return allPosts;
  return allPosts.filter((post) =>
    post.tags?.some((tag) => tags.includes(tag)),
  );
};
