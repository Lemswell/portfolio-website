import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import TagList from '@/components/ui/TagList';
import { AlertCircle, Search, SortAsc, SortDesc } from '@/components/ui/icons';
import HoverBadge from '@/components/ui/HoverBadge';


const checkAndRemoveTag = (query: string): string[] => { // takes seach bar input as a query, returns [tag, remainingQuery]
  // checks if last word is a tag, and removes it from the query
  let tagIdx = query.lastIndexOf("#");
  let tagEnd = query.indexOf(" ", tagIdx);
  let newInput = query;
  let tags = "";

  while (tagIdx !== -1 && tagEnd !== -1 && tagEnd !== tagIdx + 1) { // just in case input is cp in, gets all tags.
    const tag = newInput.substring(tagIdx + 1, tagEnd).toLowerCase();
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

function SortSwitch({ className }: { className?: string }) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const isAsc = searchParams.has("asc");

  const handleToggle = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isAsc) {
      params.delete("asc");
      router.push(`/blog?${params.toString()}`); // todo adaptable for all
    } else {
      router.push(`/blog?${params.toString()}${params.toString().length > 0 ? "&asc" : "asc"}`); // todo adaptable for all
    }
  };

  return (
    <button
      className={`
        ${className}
        hover:text-zinc-800/60
        hover:dark:text-zinc-100/60
        transition-colors
        cursor-pointer
      `}
      onClick={() => { handleToggle() }}
    >
      {searchParams.has("asc") && <SortAsc className='h-5 w-5'/>}
      {!searchParams.has("asc") && <SortDesc className='h-5 w-5'/>}
    </button>
  );
}

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

      // Extract hashtag (in query) if present
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

      if (queryValue) {
        params.set("search", queryValue);
      } else {
        params.delete("search");
      }

      router.push(`/blog?${params.toString()}`); // todo make adaptable for other routes
    }, 300); // 300ms delay

    return () => clearTimeout(timer); // Clean up timer on next key press
  }, [text, searchParams, router, urlSearchQuery, tagsQuery]);

  return (
    <div className="flex flex-col gap-2 mb-4 group">
      <div className='flex items-center border rounded-md border-black/10 dark:border-white/10 px-3 gap-3'>
        <Search className="h-5 w-5 text-black/10 dark:text-white/10" />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search posts..."
          className="py-2 flex-1 focus:outline-none"
        />
        {text.length > 0 &&
          <span
            className="text-2xl text-black/10 dark:text-white/10 hover:text-zinc-800/60 hover:dark:text-zinc-100/60 transition-colors select-none cursor-pointer"
            onClick={() => router.push(`/blog?`)}
          >
            {`\u00d7`}
          </span>}
        {/*
          {!text.length &&
          <HoverBadge
            trigger={<AlertCircle className="h-5 w-5 text-black/10 dark:text-white/10 hover:text-zinc-800/60 hover:dark:text-zinc-100/60 transition-colors" />}
            content={<span className="text-zinc-800/60 dark:text-zinc-100/60 tracking-normal font-medium font-mono">{`type #<tag_name> to search for tags`}</span>}
          />}
        */}
        <SortSwitch className="text-black/10 dark:text-white/10" />
      </div>
      {/*{tags.length === 0 &&
        <div
          className='flex items-center h-[1.86rem] px-2 opacity-0 group-hover:opacity-100 transition-opacity'>
          <span className=' font-mono text-sm font-medium text-zinc-800/20 dark:text-zinc-100/20'>
            {`type #<tag_name> to search for tags`}
          </span>
        </div>}*/}
      <TagList tags={tags} editable={true} />
    </div>
  );
};
