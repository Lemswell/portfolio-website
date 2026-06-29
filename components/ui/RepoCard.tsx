import type { GithubRepository } from "@/types/github";
import { allProjects } from "content-collections";
import TagList from "./TagList";
import Link from "next/link";

// imports both GithubRepository an allProjects for local descriptions from content collections,
// but actual projects from github

const RepoCard = ({
  repo,
  first,
  last,
}: {
  repo: GithubRepository;
  first?: boolean;
  last?: boolean;
}) => {
  // TODO: getting description from content collection doesn't work.
  const project = allProjects.find((proj) => {
    return proj._meta.fileName === `${repo.name}.md`;
  });
  const description = project?.description
    ? project.description
    : repo.description;
  return (
    <div
      key={repo.id}
      className={`flex flex-col gap-3 py-4 px-5
        border-0
        bg-zinc-50 dark:bg-background dark:hover:bg-background
        hover:bg-zinc-500/10 transition-colors duration-200
        ${first ? "rounded-t-md" : ""}
        ${last ? "rounded-b-md" : ""}`}
    >
      <div className="flex items-center justify-between">
        <Link href={"projects/" + repo.name}>
          <h3 className="text-2xl font-semibold text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            {repo.name}
          </h3>
        </Link>
        {(project?.status || repo.archived) && (
          <span className="text-sm text-zinc-800/60 dark:text-zinc-100/60">
            {project?.status ? project.status : "archived"}
          </span>
        )}
      </div>
      <p className="text-sm line-clamp-2">{description}</p>
      <TagList
        tags={repo.language ? [repo.language].concat(repo.topics) : repo.topics}
      />
    </div>
  );
};

export default RepoCard;
