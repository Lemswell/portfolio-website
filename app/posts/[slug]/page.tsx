import { allPosts } from "content-collections";

const PostPageDisplay = async({ params }: { params: Promise<{ slug: string }> }) => {
  
  const { slug } = await params;
  const post = allPosts.find((post) => {return post._meta.fileName === `${slug}.md`});
  // const readmeContent = await fetchRepoReadme(params.slug); // still need to test/make sure this works
  
  
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <header className='my-8'>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-blue-950 dark:text-blue-400 flex items-center line-clamp-1">
          <a href="/" className="text-white hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            {"Lem'\u00A0"}
          </a>
        </h1>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-blue-950 dark:text-blue-400 flex items-center line-clamp-1">
          {post ? post.title : "Post Not Found"}
        </h1>
        
        <p className="mt-3 text-lg fill-zinc-800 dark:fill-zinc-100 leading-6">
          {post?.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} | {post?.tags.join(", ")}
        </p>
        <p>
          {post ? post.grouping : "No grouping specified"}
        </p>
        <p>
          {post?.tags}
        </p>
        
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