import { fetchRepoByName, fetchRepoReadme } from '@/lib/github';
import { Github } from '@/components/ui/icons';
import { allProjects } from "content-collections";

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
        
        <p className="mt-3 text-lg fill-zinc-800 dark:fill-zinc-100 leading-6">
          {repo.description}
        </p>
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
    </main>
  );
}

export default ProjectPageDisplay;