'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { Tag } from "@/components/ui/icons";
import { Suspense, useState, useEffect } from "react";


interface TagListProps {
  tags: string[];
  edittable?: boolean;
  clickable?: boolean;
}

export const TagListClickable = ({ tagList }: { tagList: string[] }) => {


  const searchParams = useSearchParams();

  const URLSpecifiedTagString = searchParams.get("tags") ?? '';
  const router = useRouter();

  const addTagToURLParams = (tagToBeAdded: string) => { // todo
    const tags = URLSpecifiedTagString;

    return tags.split(',').includes(tagToBeAdded)
      ? tags
      : `${tags},${tagToBeAdded}`;
  };

  const tagClassNames = `
    px-2 py-[.9] rounded bg-zinc-400/15 text-sm dark:text-zinc-100 text-zinc-900 lowercase min-w-max transition-colors
  `;

  return (
    <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">

    </div>
  );
}

// tagList below the search bar
export const TagListSelected = ({ currentTagList }: { currentTagList: string[] }) => {

  const searchParams = useSearchParams();

  const URLSpecifiedTagString = searchParams.get("tags") ?? '';
  const router = useRouter();

  const [tags, setTags] = useState(currentTagList.join(','));

  useEffect(() => {
    setTags(URLSpecifiedTagString);
  }, [URLSpecifiedTagString]);

  useEffect(() => {
    // compare given list and variables;
    if (tags === URLSpecifiedTagString) return;


    const URLParamsString = new URLSearchParams(searchParams.toString());
    // update URL
    if (tags) {
      URLParamsString.set("tags", tags);
    } else if (tags === '') {
      URLParamsString.delete("tags");
    }
    router.push(`/blog?${URLParamsString.toString()}`); // todo: make adaptable for other routes

  }, [tags, URLSpecifiedTagString, searchParams, router]);


  const removeTagFromURLParams = (tags: string, tagToBeRemoved: string) => {
    return tags.split(',').filter((tag) => tag !== tagToBeRemoved).join(',');
  };

  const tagClassNames = `
    px-2 py-[.9] rounded bg-zinc-400/15 text-sm dark:text-zinc-100 text-zinc-900 lowercase min-w-max transition-colors
  `;

  return (
    <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
      {tags.split(",").map((topic) => (
        <div
          key={topic}

          className={tagClassNames}
        >
          <span
            className={`
              font-thin pr-1.5 text-zinc-800/60 dark:text-zinc-100/60 hover:text-black hover:dark:text-white
              cursor-pointer
            `}
            onClick={() => setTags(removeTagFromURLParams(tags, topic))}
            >{`\u00d7`}</span>
          {topic}
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

      {!edittable &&
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
          <TagListSelected currentTagList={tags} />
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
