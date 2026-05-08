import { allProjects } from "content-collections";
import { RepoList } from "@/components/ui/RepoList";
import { fetchRepos } from "@/lib/github";
 
export default async function App() {
  const repos = await fetchRepos();
  return (
    <main>
      <h1>Posts</h1>
      < RepoList repos={repos} displayLim={5} />
    </main>
  );
}