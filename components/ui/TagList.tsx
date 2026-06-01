import { Tag } from '@/components/ui/icons';
const TagList = ({ tags }: { tags: string[] }) => {
	return (
		<div className="mt-2 flex items-center gap-1 line-clamp-1">
			<Tag className="h-5 w-5 shrink-0 mr-2"/>
			<div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
			{tags.map(topic => (
				<span key={topic} className="px-2 py-[.9] rounded bg-zinc-300 dark:bg-zinc-700/50 text-sm lowercase min-w-max">{topic}</span>
			))}
			</div>
		</div>
	)
}

export default TagList;