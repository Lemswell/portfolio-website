import type { GithubRepository } from "@/types/github";
import RepoCard from "./RepoCard";
import { BLACKLISTED_REPO_FULLNAMES, FEATURED_REPOS } from "@/config/github";

interface RepoListProps {
  repos: GithubRepository[];
  timeLim?: number; // in milliseconds, default to 30 days
  displayLim?: number; // max number of repos to display, default to all
  featuredOnly?: boolean; // if true, only display repos in FEATURED_REPOS list
}

const RepoList = ({
  repos,
  timeLim,
  displayLim,
  featuredOnly,
}: RepoListProps) => {
  // sort by last pushed date, then filter by timeLim and displayLim

  if (repos === undefined) return null;

  let displayedRepos = repos.filter(
    (repo) => !BLACKLISTED_REPO_FULLNAMES.includes(repo.full_name),
  );
  if (featuredOnly) {
    displayedRepos = displayedRepos.filter((repo) =>
      FEATURED_REPOS.includes(repo.full_name),
    );
  }
  displayedRepos.sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );
  displayedRepos = displayedRepos.slice(
    0,
    displayLim ? displayLim : repos.length,
  );

  // filter by timeLim
  if (timeLim) {
    const showFrom = new Date().getTime() - timeLim; // defaults timLim to 30 days
    displayedRepos = displayedRepos.filter(
      (repo) => new Date(repo.pushed_at).getTime() >= showFrom,
    );
  }

  return (
    <div
      role="list"
      className="rounded-md border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-background dark:hover:bg-background"
    >
      {displayedRepos.map((repo, index: number) => (
        <div role="listitem" key={repo.id}>
          <RepoCard repo={repo} />
          {index !== displayedRepos.length - 1 && (
            <hr className="border-black/10 dark:border-white/10" />
          )}
        </div>
      ))}
    </div>
  );
};

export { RepoList };
