import { useParams } from 'next/navigation';
import { fetchRepoByName, fetchRepoReadme } from '@/lib/github';
import fs from "fs";
import path from 'path';
import { Github } from '@/components/ui/icons';

const getLocalContent = (slug: string) => {
  const CONTENT_FILE_SOURCE = path.join(__dirname, '..', '..', '..', '..', 'content', 'projects', slug);
  
  if (!fs.existsSync(CONTENT_FILE_SOURCE)) {
    return '';
  }
  

  const content = fs.readFileSync(CONTENT_FILE_SOURCE, 'utf8');

  // gray-matter parsing to added

  return content;
}

const ProjectPageDisplay = async () => {
  const params = useParams<{ slug: string }>()
 
  const repo = await fetchRepoByName(params.slug);
  const websiteContent = getLocalContent(params.slug);
  // const readmeContent = await fetchRepoReadme(params.slug); // still need to test/make sure this works
  
  
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
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
    </main>
    // To be editted
  );
}

export default ProjectPageDisplay;