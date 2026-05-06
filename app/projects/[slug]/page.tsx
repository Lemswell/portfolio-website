import { fetchRepoByName, fetchRepoReadme } from '@/lib/github';
import fs from "fs";
import path from 'path';
import { Github } from '@/components/ui/icons';

const getLocalContent = (slug: string) => {
  const CONTENT_FILE_SOURCE = path.join(process.cwd(), 'content', 'projects', `${slug}.md`);
  
  if (!fs.existsSync(CONTENT_FILE_SOURCE)) {
    return undefined;
  }

  const content = fs.readFileSync(CONTENT_FILE_SOURCE, 'utf8');

  // the returned content is the raw markdown content, which can be parsed in the frontend using
  // gray-matter and marked

  return content;
}



const ProjectPageDisplay = async({ params }: { params: Promise<{ slug: string }> }) => {
  
  const { slug } = await params;
  const repo = await fetchRepoByName(slug);
  const websiteContent = getLocalContent(slug);
  // const readmeContent = await fetchRepoReadme(params.slug); // still need to test/make sure this works
  
  
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
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
      
      <hr className='border-black/20 dark:border-white/20'></hr>
      
      <section id="project-content" className="my-8 flex flex-col gap-5">
        <pre>
          {websiteContent ? websiteContent : "No local content found for this project."}
        </pre>
      </section>
    </main>
  );
}

export default ProjectPageDisplay;