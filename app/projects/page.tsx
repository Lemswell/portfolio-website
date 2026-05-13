import { allProjects } from "content-collections";
import { RepoList } from "@/components/ui/RepoList";
import { fetchRepos } from "@/lib/github";
 
export default async function App() {
  const repos = await fetchRepos();
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-blue-950 dark:text-blue-400 flex items-center line-clamp-1">
        <a href="/" className="text-white hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
          {"Lems'\u00A0"}
        </a>
      </h1>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 flex items-center line-clamp-1">
        Projects
      </h1>
      <hr className='my-8 border-black/10 dark:border-white/10'></hr>
      < RepoList repos={repos} />
    </main>
  );
}