import TagList from "./TagList";
import Link from "next/link";
import type { Post } from "content-collections";
import { Calendar } from '@/components/ui/icons/index';
import { formatDate } from '@/lib/formatDate';

const filenameToSlug = (filename: string) => {
    return filename.replace(".md", "");
}

const BlogPostCard = ({ post }: { post: Post }) => {
    return (
        <div className="flex flex-col gap-3 py-4 px-5 hover:bg-zinc-500/10 transition-colors">
          <Link href={`/blog/${filenameToSlug(post._meta.fileName)}`}>
            <h3 className="text-2xl font-semibold text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
              {post.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{formatDate(post.date)}</span>
          </div>
          <p className="text-sm line-clamp-2">{post.tldr ? post.tldr : post.compiledContent}</p>
          <TagList tags={post.tags.includes(post.grouping) ? post.tags : [post.grouping].concat(post.tags)} />
        </div>
    )
}

export default BlogPostCard;