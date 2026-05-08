import type { GithubRepository } from "@/types/github";
import { Tag } from "./icons";
import { allProjects } from "content-collections";
import TagList from "./TagList";

const RepoCard = ({ repo }: { repo: GithubRepository }) => {
    // TODO: getting description from content collection doesn't work.
    const project = allProjects.find((proj) => {return proj._meta.fileName === `${repo.name}.md`});
    const description = project ? project.description : repo.description;
    return (
        <li key={repo.id} className="flex flex-col gap-3 py-4 px-5 rounded-md border border-black/10 dark:border-white/10 hover:border-blue-300/50 transition-colors duration-200">
          <div className="flex items-center">
            <a href={"projects/" + repo.name}><h3 className="text-2xl font-semibold text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">{repo.name}</h3></a>
            <div className="grow"></div>
            {/* above is temp solution */}
            {/* <a href={repo.html_url} target="_blank" rel="noopener noreferrer"><Github /></a> */}
            {repo.archived && <div className="text-xs text-red-500">Archived</div>}
          </div>
          <p className="text-sm line-clamp-2">{description}</p>
          < TagList tags={repo.language ? [repo.language].concat(repo.topics) : repo.topics} />
        </li>
    )
}

export default RepoCard;