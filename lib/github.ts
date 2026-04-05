
import type { GitHubRepository } from "@/types/github";

export async function fetchRepos(): Promise<GitHubRepository[]> {
    // method default to GET
    const response = await fetch("https://api.github.com/users/Lemswell/repos", { 
        headers: {
            "Accept": "application/vnd.github+json"
        }
    });
    
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as GitHubRepository[];
    return data;
}


