import { allPosts } from "content-collections";

export const filteredPosts = (
  tags?: string[],
  search?: string,
): typeof allPosts => {
  // todo: make search include filter for tags as `tags:"${tag}"`

  if (!tags || tags.length === 0) return allPosts;
  return allPosts.filter((post) =>
    post.tags?.some((tag) => tags.includes(tag)),
  );
};
