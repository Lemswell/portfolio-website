import type { GithubRepository } from "@/types/github";
import RepoCard from "./RepoCard";
import { BLACKLISTED_REPO_FULLNAMES, FEATURED_REPOS } from "@/config/github";
import Link from "next/link";

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

  const allRepoLength = displayedRepos.length;

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
    <div className="flex flex-col">
      <div
        role="list"
        className="border border-black/10 dark:border-white/10 rounded-md"
      >
        {displayedRepos.map((repo, index: number) => (
          <div role="listitem" key={repo.id}>
            {index !== 0 && (
              <hr className="border-black/10 dark:border-white/10" />
            )}
            <RepoCard
              repo={repo}
              first={index === 0}
              last={index === displayedRepos.length - 1}
            />
          </div>
        ))}
      </div>
      {displayedRepos.length < allRepoLength && (
        <Link
          href="/projects"
          className="py-1 px-4 size-fit line-clamp-1 self-center
          text-sm text-zinc-800/60 dark:text-zinc-100/60 tracking-normal
          font-medium font-mono hover:text-blue-900 dark:hover:text-blue-300
          rounded-b-md border border-t-0 border-black/10 dark:border-white/10
          bg-zinc-50 dark:bg-background
          hover:bg-zinc-500/10 transition-colors duration-200"
        >{`all projects \u2192`}</Link>
      )}
    </div>
  );
};

export { RepoList };
