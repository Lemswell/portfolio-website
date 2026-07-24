import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import TagList from '@/components/ui/TagList';

const checkAndRemoveTag = (query: string): string[] => { // takes seach bar input as a query, returns [tag, remainingQuery]
  // checks if last word is a tag, and removes it from the query
  let tagIdx = query.lastIndexOf("#");
  let tagEnd = query.indexOf(" ", tagIdx);
  let newInput = query;
  let tags = "";

  while (tagIdx !== -1 && tagEnd !== -1 && tagEnd !== tagIdx + 1) { // just in case input is cp in, gets all tags.
    const tag = newInput.substring(tagIdx + 1, tagEnd);
    tags = tags.length > 0 ? `${tags}, ${tag}` : tag;
    newInput = newInput.substring(0, tagIdx) + newInput.substring(tagEnd + 1);
    tagIdx = newInput.lastIndexOf("#");
    tagEnd = newInput.indexOf(" ", tagIdx);
    // works because always checks the last #<word> and ignores stray isolated #'s.
  }
  if (tagIdx !== -1 && tagEnd === -1) {
    return [tags, newInput, newInput.substring(0, tagIdx)] // third return value is the query that is passed to url
  }
  return [tags, newInput];
};

export default function SearchBar() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const urlSearchQuery = searchParams.get("search") || "";
  const tagsQuery = searchParams.get("tags") || "";
  const tags = tagsQuery === "" ? [] : tagsQuery.split(",");

  // 1. Instant local input state
  const [text, setText] = useState(urlSearchQuery);

  // Sync local text if the URL changes externally (e.g. Back/Forward navigation)
  useEffect(() => {
    setText(urlSearchQuery);
  }, [urlSearchQuery]);

  // 2. Debounced URL Update
  useEffect(() => {
    // If the input matches the URL already, skip navigation
    if (text === urlSearchQuery) return;
    if (text[text.lastIndexOf(" ") + 1] === "#") return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      let queryValue = text;

      // Extract hashtag if present
      const searchTerms = checkAndRemoveTag(text);
      if (searchTerms[0].length > 0) {
        const newQuery = searchTerms[1];
        const tags = searchTerms[0].split(",");
        const currentTags = tagsQuery ? tagsQuery.split(",") : [];

        tags.forEach((tag) => {
          if (!currentTags.includes(tag)) {
            const updatedTags = [...currentTags, tag].join(",");
            params.set("tags", updatedTags);
          }
        })

        queryValue = searchTerms.length == 3 ? searchTerms[2] : newQuery;
        setText(newQuery); // Update local input text to drop the extracted tag
      }
      // todo: method for removing tag

      if (queryValue) {
        params.set("search", queryValue);
      } else {
        params.delete("search");
      }

      router.push(`/blog?${params.toString()}`);
    }, 300); // 300ms delay

    return () => clearTimeout(timer); // Clean up timer on next keypress
  }, [text, searchParams, router, urlSearchQuery, tagsQuery]);

  console.log(tags);
  return (
    <div className="flex flex-col gap-2 my-3.5">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search posts..."
        className="px-4 py-2 rounded-md border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 focus:outline-none"
      />
      {tags.length > 0 && <TagList tags={tags} searchMode={true} />}
    </div>
  );
};
