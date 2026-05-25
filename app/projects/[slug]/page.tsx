import { fetchRepoByName, fetchRepoReadme } from '@/lib/github';
import { Github, Calendar, File } from '@/components/ui/icons';
import Link from 'next/link';
import { allProjects } from "content-collections";
import TagList from "@/components/ui/TagList";
import BlogPostList from '@/components/ui/BlogPostList';
import { formatDate } from '@/lib/formatDate';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const ProjectPageDisplay = async({ params }: { params: Promise<{ slug: string }> }) => {
  
  const { slug } = await params;
  const project = allProjects.find((proj) => {return proj._meta.fileName === `${slug}.md`});
  const repo = await fetchRepoByName(slug).catch((e) => project ? null : notFound()); // catch error if repo not found
  const readmeContent =  await fetchRepoReadme(slug).catch((e) => {console.log(e); return null}); // still need to test/make sure this works
  const heading = repo?.name ? repo.name : project ? project._meta.fileName.slice(0, -3) : ""; // prepping for non-software/github projects

  
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className='my-8'>
        <section>
          <Link href="/projects" className="text-xl sm:text-2xl font-bold tracking-tight text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            {"Project\u00A0"}
          </Link>
          <h1 className="pb-1 text-5xl sm:text-6xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
            {heading.charAt(0).toUpperCase() + heading.slice(1)}
          </h1>
        </section>
        <section className="mt-3 flex flex-col gap-2">
          {repo && <div className="my-1 flex items-center gap-3 text-zinc-500/80 dark:text-zinc-400/80">
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
          </div>}
          {/* displaying locally written description over GitHub description */}
          {repo || project?.description ? (
            <p className="text-md line-clamp-2">{project?.description ? project?.description : repo?.description}</p>
          ) : null}
          {repo && <TagList tags={repo.language ? [repo.language].concat(repo.topics) : repo.topics} />}
        </section>
      </header>
      
      <hr className='border-black/10 dark:border-white/10' />
      
      <section className="flex flex-col gap-3">
        {project && <article dangerouslySetInnerHTML={{ __html: project.compiledContent }} 
        className="prose sm:prose-lg dark:prose-invert mt-3 mx-auto max-w-6xl py-6
        prose-headings:font-semibold"/>}

        {readmeContent && <section className="m-10 mt-5 flex flex-col rounded-md border border-black/10 dark:border-white/10">
          <h2 className="p-3 text-sm line-clamp-1 justify-center whitespace-pre-line text-zinc-600 font-medium font-mono">
            {`${repo?.full_name}/`}<a href={repo?.html_url + '/blob/main/README.md'} target="_blank" rel="noopener noreferrer" className="hover:underline">
              README.md
            </a>
          </h2>
          <hr className='border-black/10 dark:border-white/10' />
          < MarkdownRenderer rawMarkdown={readmeContent} 
          className="prose dark:prose-invert p-8 mx-auto max-w-6xl py-6 
          text-zinc-600 dark:text-zinc-400 max-h-80 overflow-y-scroll  
          prose-headings:font-semibold prose-headings:text-zinc-600 dark:prose-headings:text-zinc-400 prose-a:text-zinc-600 dark:prose-a:text-zinc-400"/>
        </section>}
      </section>
      {(project || readmeContent) && <hr className='border-black/10 dark:border-white/10' />}

      <section id="relevant-blog" className="my-8 flex flex-col gap-5">
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
          <File className='mr-3 text-blue-950 dark:text-blue-400' />
          <Link href="/blog" className="text-white hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            Relevant Posts
          </Link>
        </h2>
        < BlogPostList tags={[slug]} />
      </section>
    </main>
  );
}

export default ProjectPageDisplay;