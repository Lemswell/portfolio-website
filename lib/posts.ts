import { allPosts } from "content-collections";

export const filteredPosts = (
  asc: boolean = true,
  search?: string,
  tags?: string[],
): typeof allPosts => {
  // todo: make search include filter for tags as `tags:"${tag}"`
  if (!search || !tags || tags.length === 0) return asc ? [...allPosts] : [...allPosts].reverse();;

  // seach filter extracts tags from search via `#tag`
  const searchTerms = search.replace(/\s+/g, ' ').trim().split(" ");
  for (let i = 0; i < searchTerms.length; i++) {
    if (searchTerms[i].trim().startsWith('#')) {
      tags.push(searchTerms[i].substring(1));
      searchTerms[i] = '';
    }
  }
  const newSearch = searchTerms.join(' ').trim();

  console.log(asc);

  const filtered = allPosts.filter((post) => {
    return (
      post.tags?.some((tag) => tags.includes(tag)) ||
      post.title?.toLowerCase().includes(newSearch) ||
      post.tldr?.toLowerCase().includes(newSearch) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(newSearch))
    );
  });


  return filtered.reverse();
};
