import { allPosts } from "content-collections";
import TagList from "@/components/ui/TagList";
import Calendar from "@/components/ui/icons/Calendar";

const PostPageDisplay = async({ params }: { params: Promise<{ slug: string }> }) => {
  
  const { slug } = await params;
  const post = allPosts.find((post) => {return post._meta.fileName === `${slug}.md`});
  // const readmeContent = await fetchRepoReadme(params.slug); // still need to test/make sure this works
  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-blue-950 dark:text-blue-400 flex items-center line-clamp-1">
          Post Not Found
        </h1>
      </main>
    );
  }
  
  return (
    
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className='my-8 flex flex-col gap-2 '>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-blue-950 dark:text-blue-400 flex items-center">
          {post.title}
        </h1>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
          <a href={`/projects/${post.grouping}`} className="text-white hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            {`${post.grouping}`}
          </a>
        </h2>
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          < Calendar className="w-3 h-3" />
          <span className="text-xs">{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <p className="text-sm line-clamp-2">{post.tldr ? post.tldr : post.compiledContent}</p>
        < TagList tags={post.tags.includes(post.grouping) ? post.tags : [post.grouping].concat(post.tags)} />
        
      </header>
      
      <hr className='border-black/10 dark:border-white/10'></hr>
      
      <section id="project-content" className="my-8 flex flex-col gap-5">
        {/*  */}
        {post && <div dangerouslySetInnerHTML={{ __html: post.compiledContent }} />}
      </section>
    </main>
  );
}

export default PostPageDisplay;