'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { Tag } from "@/components/ui/icons";
import { Suspense } from "react";


interface TagListProps {
  tags: string[];
  edittable?: boolean;
  clickable?: boolean;
}

export const TagListClickable = ({ tagList }: { tagList: string[] }) => {
  // should i make togglable?

  const searchParams = useSearchParams();

  const URLParamsString = new URLSearchParams(searchParams.toString());
  const URLSpecifiedTags = searchParams.get("tags")?.split(",") ?? [];
  const router = useRouter();

  const getNewTagStringWith = (tagToBeAdded: string) => { // returns new URL tag string
    tagToBeAdded = tagToBeAdded.toLowerCase();
    const tags = URLSpecifiedTags;
    if (tags.includes(tagToBeAdded)) return "";
    if (tags.length === 0) return tagToBeAdded;
    return `${tags.join(",")},${tagToBeAdded}`;
  };

  const pushTagStringToURL = (tags: string) => {
    if (tags.length === 0) {
      URLParamsString.delete("tags");
    } else {
      URLParamsString.set("tags", tags);
    }
    router.push(`/blog?${URLParamsString.toString()}`);
  };



  const tagClassNames = `
    px-2 py-[.9] rounded bg-zinc-400/15 text-sm dark:text-zinc-100 text-zinc-900
    lowercase min-w-max transition-colors cursor-pointer
  `;

  return (
    <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
      {tagList.map((topic) => (
        <div
          key={topic}
          onClick={() => { pushTagStringToURL(getNewTagStringWith(topic)) }}
          className={tagClassNames}
        >
          {topic}
        </div>
      ))}
    </div>
  );
}

// tagList below the search bar
export const TagListSelected = () => {

  const searchParams = useSearchParams();


  const URLParamsString = new URLSearchParams(searchParams.toString());
  const URLSpecifiedTags = searchParams.get("tags")?.split(',') ?? [];
  const router = useRouter();

  const removeTagFromURLParams = (tags: string[], tagToBeRemoved: string) => {
    return tags.filter((tag) => tag !== tagToBeRemoved);
  };

  const pushCurrentTagsToURL = (tags: string[]) => {
    if (tags.length === 0) {
      URLParamsString.delete("tags");
    } else {
      URLParamsString.set("tags", tags.join(','));
    }
    router.push(`/blog?${URLParamsString.toString()}`);
  };

  const tagClassNames = `
    px-2 py-[.9] rounded bg-zinc-400/15 text-sm dark:text-zinc-100 text-zinc-900 lowercase min-w-max transition-colors
  `;

  return (
    <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
      {URLSpecifiedTags.map((topic) => (
        <div
          key={topic}

          className={tagClassNames}
        >
          <span
            className={`
              font-thin pr-1.5 text-zinc-800/60 dark:text-zinc-100/60 hover:text-black hover:dark:text-white
              cursor-pointer
            `}
            onClick={() => pushCurrentTagsToURL(removeTagFromURLParams(URLSpecifiedTags, topic))}
            >{`\u00d7`}</span>
          <span>{topic}</span>
        </div>
      ))}
    </div>
  );
}

const TagList = ({ tags, edittable, clickable }: TagListProps) => {
  edittable = edittable ?? false;
  clickable = clickable ?? false;

  if (tags.length === 0) return null;

  const tagClassNames = `
    px-2 py-[.9] rounded bg-zinc-400/15 text-sm dark:text-zinc-100 text-zinc-900 lowercase min-w-max transition-colors hover:bg-zinc-400/30
  `;

  return (
    <div className="mt-2 flex items-center gap-1 line-clamp-1">
      {!edittable && <Tag className="h-5 w-5 shrink-0 mr-2" />}

      {!edittable && !clickable &&
        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
          {tags.map((topic) => (
            <div
              key={topic}
              className={tagClassNames}
            >
              {/*{edittable && <span className="font-thin pr-1.5 text-zinc-800/60 dark:text-zinc-100/60 hover:text-black hover:dark:text-white">{`\u00d7`}</span>}*/}
              {topic}
            </div>
          ))}
        </div>
      }
      {edittable &&
        <Suspense fallback={<div />}>
          <TagListSelected />
        </Suspense>
      }
      {clickable &&
        <Suspense fallback={<div />}>
          <TagListClickable tagList={tags} />
        </Suspense>
      }
    </div>
  );
};

export default TagList;
