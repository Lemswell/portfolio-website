import type { GithubRepository } from "@/types/github";

interface RepoListProps {
  repos: GithubRepository[];
  timeLim?: number; // in milliseconds, default to 30 days
  displayLim?: number; // max number of repos to display, default to all
}

function RepoList({ repos, timeLim, displayLim }: RepoListProps) { 

  // sort by last pushed date, then filter by timeLim and displayLim

  let displayedRepos = [...repos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()).slice(0, displayLim ? displayLim : repos.length);
  
  // filter by timeLim
  const showFrom = new Date().getTime() - (timeLim ? timeLim : 1000 * 60 * 60 * 24 * 30); // defaults timLim to 30 days
  displayedRepos = displayedRepos.filter(repo => new Date(repo.pushed_at).getTime() >= showFrom);

  return (
    <div className="flex flex-col gap-2">
      {displayedRepos.map(repo => (
        <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1 p-2 rounded-md border border-zinc-700/50 bg-zinc-800 hover:bg-zinc-700/50 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">{repo.name}</h3>
            {repo.archived && <span className="text-xs text-red-500">Archived</span>}
          </div>
          <p className="text-xs text-zinc-400">{repo.description}</p>
          {repo.topics.length > 0 && repo.topics.map(topic => (
            <span key={topic} className="px-1 rounded bg-zinc-700/50">{topic}</span>
          ))}
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            {repo.language && <span className="text-xs">{repo.language}</span>}
            <span>{new Date(repo.pushed_at).toLocaleDateString()}</span>
          </div>
        </a>
      ))}
    </div>
  )
}

export { RepoList };