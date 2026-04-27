import type { GithubRepository } from "@/types/github";
import { Tag } from "./icons";

const RepoCard = ({ repo }: { repo: GithubRepository }) => {
    return (
        <li key={repo.id} className="flex flex-col gap-3 py-4 px-5 rounded-md border border-zinc-700/50 hover:border-zinc-700/20 transition-colors duration-200">
          <div className="flex items-center">
            <h3 className="text-2xl font-semibold grow text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">{repo.name}</h3>
            {/* <a href={repo.html_url} target="_blank" rel="noopener noreferrer"><Github /></a> */}
            {repo.archived && <div className="text-xs text-red-500">Archived</div>}
          </div>
          <p className="text-sm line-clamp-2">{repo.description}</p>
          <div className="mt-2 flex items-center gap-1 line-clamp-1">
            <Tag className="h-5 w-5 mr-2"/>
            {repo.language && <span className="px-2 py-[.9] rounded bg-zinc-700/50 text-sm lowercase line-clamp-1">{repo.language}</span>}
            {repo.topics.length > 0 && repo.topics.map(topic => (
              <span key={topic} className="px-2 py-[.9] rounded bg-zinc-700/50 text-sm lowercase line-clamp-1">{topic}</span>
            ))}
          </div>
        </li>
    )
}

export default RepoCard;