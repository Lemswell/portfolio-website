import { allPosts } from "content-collections";
import TagList from "@/components/ui/TagList";
import Calendar from "@/components/ui/icons/Calendar";
import { formatDate } from '@/lib/formatDate';

const PostPageDisplay = async({ params }: { params: Promise<{ slug: string }> }) => {
  
  const { slug } = await params;
  const post = allPosts.find((post) => {return post._meta.fileName === `${slug}.md`});
  // const readmeContent = await fetchRepoReadme(params.slug); // still need to test/make sure this works
  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-950 dark:text-blue-400 flex items-center line-clamp-1">
          Post Not Found
        </h1>
      </main>
    );
  }
  
  return (
    
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className='my-8 flex flex-col gap-2 '>
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-950 dark:text-blue-400 flex items-center">
          {post.title}
        </h1>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
          <a href={`/projects/${post.grouping}`} className="text-white hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            {`${post.grouping}`}
          </a>
        </h2>
        <div className="flex items-center gap-2 text-zinc-500/80 dark:text-zinc-400/80">
          < Calendar className="w-4 h-4" />
          <span className="text-xs">{formatDate(post.date)}</span>
        </div>
        <p className="text-md line-clamp-2">{post.tldr ? post.tldr : post.compiledContent}</p>
        < TagList tags={post.tags.includes(post.grouping) ? post.tags : [post.grouping].concat(post.tags)} />
        
      </header>
      
      <hr className='border-black/10 dark:border-white/10'></hr>
      
      {post && <article dangerouslySetInnerHTML={{ __html: post.compiledContent }} 
      className="prose sm:prose-lg dark:prose-invert mx-auto max-w-6xl py-6 
      prose-h1:font-semibold prose-h1:pt-3 prose-h2:font-medium prose-h3:font-medium"/>}

    </main>
  );
}

export default PostPageDisplay;