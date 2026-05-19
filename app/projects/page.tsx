import { allProjects } from "content-collections";
import { RepoList } from "@/components/ui/RepoList";
import { fetchRepos } from "@/lib/github";
import Link from 'next/link';
 
export default async function App() {
  const repos = await fetchRepos();
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="my-8">
        <Link href="/" className="text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
          {"Lems'\u00A0"}
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
          Projects
        </h1>
        <p className='text-sm line-clamp-1 justify-center whitespace-pre-line text-zinc-600 tracking-normal font-medium font-mono mt-3'>
          {`Here's a list of some recent software projects I've worked on.`}
        </p>
      </header>
      <hr className='my-8 border-black/10 dark:border-white/10'></hr>
      < RepoList repos={repos} />
    </main>
  );
}