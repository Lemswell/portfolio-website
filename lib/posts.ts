import { allPosts } from "content-collections";

export const filteredPosts = (
  // if asc true, it gets 'newer' is you scroll down (jeez "ascending order" can be ambiguious sometimes)
  asc: boolean = false,
  search?: string, // TODO: still doesn't work
  tags?: string[],
): typeof allPosts => {

  // if theres no search AND no tags return all posts
  if ((!search || search === '') && (!tags || tags.length === 0)) return asc ? [...allPosts] : [...allPosts].reverse();

  const filtered = allPosts.filter((post) => {
    const lowerCaseSearch = search?.toLowerCase() || "";
    return (
      (!tags || tags.length === 0 ||
        tags.every((tag) => post.tags?.includes(tag))) &&
      (!search || search === '' ||
        post.title?.toLowerCase().includes(lowerCaseSearch) ||
        post.tldr?.toLowerCase().includes(lowerCaseSearch) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(lowerCaseSearch))
      )
    );
  });

  return asc ? [...filtered] : [...filtered].reverse();
};
