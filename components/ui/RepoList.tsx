import { fetchRepos } from "@/lib/github";

async function RepoList() {
  
  const repos = await fetchRepos()
  const sortedRepos = repos.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

  
}

export default RepoList