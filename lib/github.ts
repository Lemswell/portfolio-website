import type { GithubRepository } from "@/types/github";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 

const headers: { [key: string]: string } = {
    "Accept": "application/vnd.github+json",
}

if (GITHUB_TOKEN != undefined) // static auth
    headers["Authorization"] = `token ${GITHUB_TOKEN}`;

export async function fetchRepos(): Promise<GithubRepository[]> {
    // method default to GET
    const response = await fetch("https://api.github.com/users/Lemswell/repos", { 
        headers: headers
    });
    
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as GithubRepository[];
    return data;
}