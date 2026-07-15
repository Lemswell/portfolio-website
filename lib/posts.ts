import { allPosts } from "content-collections";

export const filteredPosts = (
  // if asc true, it gets 'newer' is you scroll down (jeez "ascending order" can be ambiguious sometimes)
  asc: boolean = false,
  search?: string, // TODO: still doesn't work
  tags?: string[],
): typeof allPosts => {
  // if theres no search AND no tags
  if (!search && (!tags || tags.length === 0)) return asc ? [...allPosts] : [...allPosts].reverse();

  if (!tags) tags = [];

  let newSearch = search ? search : "";
  const searchTerms =
    (typeof search === "string" ? search : "") // this was done by ai and i never thought of doing something like this
      .replace(/\s+/g, " ")
      .trim()
      .split(" ");

  // search terms are then seperated into tags and newSearch. It is not used in return.
  // seach filter extracts tags from search via `#tag`
  if (searchTerms) {
    for (let i = 0; i < searchTerms.length; i++) {
      if (searchTerms[i].trim().startsWith('#')) {
        tags.push(searchTerms[i].substring(1));
        searchTerms[i] = '';
      }
    }
    newSearch = searchTerms.join(' ').trim();
  }

  const filtered = allPosts.filter((post) => {
    return (
      post.tags?.some((tag) => tags?.includes(tag)) &&
      (newSearch === "" || (newSearch != '' && (
        post.title?.toLowerCase().includes(newSearch) ||
        post.tldr?.toLowerCase().includes(newSearch) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(newSearch))
      )))
    );
  });

  return asc ? [...filtered] : [...filtered].reverse();
};
