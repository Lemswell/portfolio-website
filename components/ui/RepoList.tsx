import type { GithubRepository } from "@/types/github";
import RepoCard from "./RepoCard";

interface RepoListProps {
  repos: GithubRepository[];
  timeLim?: number; // in milliseconds, default to 30 days
  displayLim?: number; // max number of repos to display, default to all
}

const RepoList = ({ repos, timeLim, displayLim }: RepoListProps) => { 

  // sort by last pushed date, then filter by timeLim and displayLim

  let displayedRepos = [...repos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()).slice(0, displayLim ? displayLim : repos.length);
  
  // filter by timeLim
  const showFrom = new Date().getTime() - (timeLim ? timeLim : 1000 * 60 * 60 * 24 * 30); // defaults timLim to 30 days
  displayedRepos = displayedRepos.filter(repo => new Date(repo.pushed_at).getTime() >= showFrom);

  return (
    <ul className="flex flex-col gap-4">
      {displayedRepos.map(repo => (
        <RepoCard repo={repo} key={repo.id} />
      ))}
    </ul>
  )
}

export { RepoList };