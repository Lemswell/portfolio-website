import { Tag } from "@/components/ui/icons";
const TagList = ({ tags }: { tags: string[] }) => {
  // make tags clickable
  if (tags.length === 0) return null;
  return (
    <div className="mt-2 flex items-center gap-1 line-clamp-1">
      <Tag className="h-5 w-5 shrink-0 mr-2" />
      <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
        {tags.map((topic) => (
          <span
            key={topic}
            className="px-2 py-[.9] rounded bg-zinc-400/15 hover:bg-zinc-400/30
            text-sm lowercase min-w-max transition-colors"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagList;
