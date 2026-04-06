
import type { GithubRepository } from "@/types/github";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // not sure how to not have this go through if it cant find the variable

export async function fetchRepos(): Promise<GithubRepository[]> {
    // method default to GET
    const response = await fetch("https://api.github.com/users/Lemswell/repos", { 
        headers: {
            "Authorization": `Bearer ${GITHUB_TOKEN}`,
            "Accept": "application/vnd.github+json"
        }
    });
    
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as GithubRepository[];
    return data;
}


