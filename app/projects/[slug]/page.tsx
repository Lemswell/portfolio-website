import { fetchRepoByName, fetchRepoReadme } from '@/lib/github';
import { Github, Clanendar, File } from '@/components/ui/icons';
import { allProjects } from "content-collections";
import TagList from "@/components/ui/TagList";
import BlogPostList from '@/components/ui/BlogPostList';

const ProjectPageDisplay = async({ params }: { params: Promise<{ slug: string }> }) => {
  
  const { slug } = await params;
  const repo = await fetchRepoByName(slug);
  const project = allProjects.find((proj) => {return proj._meta.fileName === `${slug}.md`});
  // const readmeContent = await fetchRepoReadme(params.slug); // still need to test/make sure this works
  
  
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className='my-8'>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-blue-950 dark:text-blue-400 flex items-center line-clamp-1">
          <a href="/" className="text-white hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            {"Lems'\u00A0"}
          </a>
          {repo.name}
        </h1>
        
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          < Calendar className="w-3 h-3" />
          <span className="text-xs">`{new Date(repo.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} - {new Date(repo.pushed_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`</span>
        </div>
        <p className="text-sm line-clamp-2">{project?.description}</p>
        <p className="text-sm line-clamp-2">{repo.description}</p>
        < TagList tags={repo.language ? [repo.language].concat(repo.topics) : repo.topics} />
        <div className="mt-5">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            <Github />
          </a>
        </div>
      </header>
      
      <hr className='border-black/10 dark:border-white/10'></hr>
      
      <section id="project-content" className="my-8 flex flex-col gap-5">
        {/*  */}
        {project && <div dangerouslySetInnerHTML={{ __html: project.compiledContent }} />}
      </section>

      <hr className='border-black/10 dark:border-white/10'></hr>

      <section id="relevant-blog" className="my-8 flex flex-col gap-5">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
          <File className='mr-3 text-blue-950 dark:text-blue-400' />
          <a href="/blog">Posts</a>
        </h2>
        {/*  */}
        < BlogPostList tags={[slug]} />
      </section>
    </main>
  );
}

export default ProjectPageDisplay;