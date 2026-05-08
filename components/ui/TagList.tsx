import { Tag } from '@/components/ui/icons';
const TagList = ({ tags }: { tags: string[] }) => {
	return (
		<div className="mt-2 flex items-center gap-1 line-clamp-1">
			<Tag className="h-5 w-5 mr-2"/>
			{tags.map(topic => (
				<span key={topic} className="px-2 py-[.9] rounded bg-zinc-700/50 text-sm lowercase line-clamp-1">{topic}</span>
			))}
		</div>
	)
}

export default TagList;