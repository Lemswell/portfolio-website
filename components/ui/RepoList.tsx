import { fetchRepos } from "@/lib/github";

async function RepoList(displayLim?: number, timeLim?: number) { 

  const repos = await fetchRepos()
  const sortedRepos = repos.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());



  // maybe add a 'no show' list
  for (let i: number = 0; i < (displayLim ? displayLim : repos.length); i++) {
    
  }
  

}

export { RepoList };