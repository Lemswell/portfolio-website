'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { Tag } from "@/components/ui/icons";
import { Suspense } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


interface TagListProps {
  tags: string[];
  editable?: boolean;
  clickable?: boolean;
}

const tagClasses = `
  px-2 py-[.9] rounded bg-zinc-400/15 text-sm dark:text-zinc-100 text-zinc-900
  lowercase min-w-max transition-colors
`;

const pushTagStringToURL = (tags: string, URLParamsString: URLSearchParams, router: AppRouterInstance) => {
  if (tags.length === 0) {
    URLParamsString.delete("tags");
  } else {
    URLParamsString.set("tags", tags);
  }
  router.push(`/blog?${URLParamsString.toString()}`);
};

const addToTagString = (tags: string[], tagToBeAdded: string) => {
  tagToBeAdded = tagToBeAdded.toLowerCase();
  if (tags.includes(tagToBeAdded)) return tags.join(",");
  if (tags.length === 0) return tagToBeAdded;
  return `${tags.join(",")},${tagToBeAdded}`; // returns new URL tag string
}

const removeFromTagString = (tags: string[], tagToBeRemoved: string) => {
  return tags.filter((tag) => tag !== tagToBeRemoved).join(",");
}

const toggleTagInString = (tags: string[], tagToBeToggled: string) => {
  tagToBeToggled = tagToBeToggled.toLowerCase();
  if (tags.includes(tagToBeToggled)) return removeFromTagString(tags, tagToBeToggled);
  return addToTagString(tags, tagToBeToggled);
}

export const TagListClickable = ({ tagList }: { tagList: string[] }) => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const URLParamsString = new URLSearchParams(searchParams.toString());
  const URLSpecifiedTags = searchParams.get("tags")?.split(",") ?? [];

  const clickableTagClasses = `${tagClasses} cursor-pointer`;

  return (
    <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
      {tagList.map((topic) => (
        <div
          key={topic}
          onClick={() => { pushTagStringToURL(toggleTagInString(URLSpecifiedTags, topic), URLParamsString, router) }}
          className={clickableTagClasses}
        >
          {topic}
        </div>
      ))}
    </div>
  );
}

export const TagListSelected = () => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const URLParamsString = new URLSearchParams(searchParams.toString());
  const URLSpecifiedTags = searchParams.get("tags")?.split(',') ?? [];

  return (
    <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
      {URLSpecifiedTags.map((topic) => (
        <div
          key={topic}
          className={tagClasses}
        >
          <span
            className={`font-thin pr-1.5 text-zinc-800/60 dark:text-zinc-100/60 hover:text-black hover:dark:text-white cursor-pointer`}
            onClick={() => pushTagStringToURL(removeFromTagString(URLSpecifiedTags, topic), URLParamsString, router)}
            >{`\u00d7`}</span>
          <span>{topic}</span>
        </div>
      ))}
    </div>
  );
}

const TagList = ({ tags, editable, clickable }: TagListProps) => {
  editable = editable ?? false;
  clickable = clickable ?? false;

  if (tags.length === 0) return null;

  return (
    <div className="mt-2 flex items-center gap-1 line-clamp-1">
      {!editable && <Tag className="h-5 w-5 shrink-0 mr-2" />}

      {!editable && !clickable &&
        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
          {tags.map((topic) => (
            <div key={ topic } className={ tagClasses }> { topic } </div>
          ))}
        </div>
      }

      {editable &&
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
