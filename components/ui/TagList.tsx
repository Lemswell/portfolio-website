import { Tag } from "@/components/ui/icons";

interface TagListProps {
  tags: string[];
  searchMode?: boolean;
}

const TagList = ({ tags, searchMode }: TagListProps) => {
  if (!searchMode) searchMode = false;
  // make tags clickable
  if (tags.length === 0) return null;
  return (
    <div className="mt-2 flex items-center gap-1 line-clamp-1">
      {!searchMode && <Tag className="h-5 w-5 shrink-0 mr-2" />}
      <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
        {tags.map((topic) => (
          <div
            key={topic}
            className={`px-2 py-[.9] rounded bg-zinc-400/15
              hover:bg-zinc-400/30
              text-sm dark:text-zinc-100 text-zinc-900 lowercase min-w-max transition-colors`}
          >
            {searchMode && <span className="font-thin pr-1.5 text-zinc-800/60 dark:text-zinc-100/60 hover:text-black hover:dark:text-white">{`\u00d7`}</span>}
            {topic}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagList;
