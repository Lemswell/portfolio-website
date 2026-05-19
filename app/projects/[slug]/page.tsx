import { fetchRepoByName, fetchRepoReadme } from '@/lib/github';
import { Github, Calendar, File } from '@/components/ui/icons';
import Link from 'next/link';
import { allProjects } from "content-collections";
import TagList from "@/components/ui/TagList";
import BlogPostList from '@/components/ui/BlogPostList';
import { formatDate } from '@/lib/formatDate';

const ProjectPageDisplay = async({ params }: { params: Promise<{ slug: string }> }) => {
  
  const { slug } = await params;
  const repo = await fetchRepoByName(slug);
  const project = allProjects.find((proj) => {return proj._meta.fileName === `${slug}.md`});
  // const readmeContent = await fetchRepoReadme(params.slug); // still need to test/make sure this works
  
  
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className='my-8 flex flex-col gap-3'>
        <h1 className="mb-3 text-4xl sm:text-5xl font-bold tracking-tight text-blue-950 dark:text-blue-400 flex items-center line-clamp-1">
          {/* <Link href="/" className="text-white hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            {"Lems'\u00A0"}
          </Link> */}
          {repo.name}
        </h1>
        
        <div className="flex items-center gap-2 text-zinc-500/80 dark:text-zinc-400/80">
          <Calendar className="w-4 h-4" />
          {/* <span className="text-xs">{new Date(repo.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} - {new Date(repo.pushed_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span> */}
          <span className="text-xs">{formatDate(repo.pushed_at)}</span>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            <Github />
          </a>
        </div>
        <p className="text-md line-clamp-2">{project?.description}</p>
        {/* <p className="text-sm line-clamp-2">{repo.description}</p> */}
        < TagList tags={repo.language ? [repo.language].concat(repo.topics) : repo.topics} />
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
          <Link href="/blog">Posts</Link>
        </h2>
        {/*  */}
        < BlogPostList tags={[slug]} />
      </section>
    </main>
  );
}

export default ProjectPageDisplay;