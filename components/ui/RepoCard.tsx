import type { GithubRepository } from "@/types/github";
import { Tag } from "./icons";

const RepoCard = ({ repo }: { repo: GithubRepository }) => {
    return (
        <li key={repo.id} className="flex flex-col gap-1 p-2 rounded-md border border-zinc-700/50 bg-zinc-800 hover:bg-zinc-700/50 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">{repo.name}</h3>
            {/* <a href={repo.html_url} target="_blank" rel="noopener noreferrer"><Github /></a> */}
            {repo.archived && <div className="text-xs text-red-500">Archived</div>}
          </div>
          <p className="text-xs text-zinc-400">{repo.description}</p>
          <div className="flex items-center gap-1">
            <Tag />
            {repo.language && <span className="px-1 rounded bg-zinc-700/50">{repo.language}</span>}
            {repo.topics.length > 0 && repo.topics.map(topic => (
              <span key={topic} className="px-1 rounded bg-zinc-700/50">{topic}</span>
            ))}
          </div>
        </li>
    )
}

export default RepoCard;