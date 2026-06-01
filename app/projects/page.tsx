import { allProjects } from "content-collections";
import { RepoList } from "@/components/ui/RepoList";
import { fetchRepos } from "@/lib/github";
import Link from 'next/link';
 
export default async function App() {
  // figure out some way to concat non-github projects (LATER)
  const repos = await fetchRepos().catch((e) => []);
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="my-8">
        <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
          {"Lemuel's\u00A0"}
        </Link>
        <h1 className="pb-1 text-5xl sm:text-6xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
          Projects
        </h1>
        <p className='text-sm line-clamp-1 justify-center whitespace-pre-line text-zinc-600 tracking-normal font-medium font-mono mt-3'>
          {`A list of some recent software projects I've worked on.`}
        </p>
      </header>
      <hr className='my-8 border-black/10 dark:border-white/10'></hr>
      <RepoList repos={repos} />
    </main>
  );
}