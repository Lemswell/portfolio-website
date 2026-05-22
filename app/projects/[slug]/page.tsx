import { fetchRepoByName, fetchRepoReadme } from '@/lib/github';
import { Github, Calendar, File } from '@/components/ui/icons';
import Link from 'next/link';
import { allProjects } from "content-collections";
import TagList from "@/components/ui/TagList";
import BlogPostList from '@/components/ui/BlogPostList';
import { formatDate } from '@/lib/formatDate';
import { notFound } from 'next/navigation';

const ProjectPageDisplay = async({ params }: { params: Promise<{ slug: string }> }) => {
  
  const { slug } = await params;
  const repo = await fetchRepoByName(slug).catch((e) => notFound()); // catch error if repo not found
  const project = allProjects.find((proj) => {return proj._meta.fileName === `${slug}.md`});
  const readmeContent =  null; // await fetchRepoReadme(params.slug); // still need to test/make sure this works

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className='my-8 flex flex-col gap-3'>
        <h1 className="mb-3 text-4xl sm:text-5xl font-bold text-blue-950 dark:text-blue-400 flex items-center line-clamp-1">
          {repo.name}
        </h1>
        
        <div className="flex items-center gap-3 text-zinc-500/80 dark:text-zinc-400/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{formatDate(repo.pushed_at)}</span>
          </div>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            <Github className="w-4 h-4"/>
          </a>
          {repo.homepage!= "" && 
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            {/* TODO: replace with link icon */}
            <File className="w-4 h-4"/>
          </a>}
        </div>
        {/* displaying locally written description over GitHub description */}
        <p className="text-md line-clamp-2">{project?.description ? project?.description : repo.description}</p> 
        < TagList tags={repo.language ? [repo.language].concat(repo.topics) : repo.topics} />
      </header>
      
      <hr className='border-black/10 dark:border-white/10' />
      
      {project && <article dangerouslySetInnerHTML={{ __html: project.compiledContent }} 
      className="prose sm:prose-lg dark:prose-invert mt-3 mx-auto max-w-6xl py-6  
      prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-semibold"/>}



      {(project || readmeContent) && <hr className='border-black/10 dark:border-white/10' />}

      <section id="relevant-blog" className="my-8 flex flex-col gap-5">
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
          <File className='mr-3 text-blue-950 dark:text-blue-400' />
          <Link href="/blog" className="text-white hover:text-blue-900 dark:hover:text-blue-300 transition-colors">Posts</Link>
        </h2>
        {/*  */}
        < BlogPostList tags={[slug]} />
      </section>
    </main>
  );
}

export default ProjectPageDisplay;