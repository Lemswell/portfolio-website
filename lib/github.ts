import type { GithubRepository } from "@/types/github";
import { USERNAME } from "@/config/github";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 

const headers: { [key: string]: string } = {
    "Accept": "application/vnd.github+json",
}

if (GITHUB_TOKEN != undefined) // static auth
    headers["Authorization"] = `token ${GITHUB_TOKEN}`;

export async function fetchRepos(): Promise<GithubRepository[]> {
    // method default to GET
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos`, {
        headers: headers
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as GithubRepository[];
    return data;
}

export async function fetchRepoByName(repoName: string): Promise<GithubRepository> {
    const response = await fetch(`https://api.github.com/repos/${USERNAME}/${repoName}`, {
        headers: headers
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as GithubRepository;
    return data;
}

// TODO: not working
// consider the need to fetch the README.md file content from the repository's default branch.
export async function fetchRepoReadme(repoName: string): Promise<string> {
    const response = await fetch(`https://api.github.com/repos/${USERNAME}/${repoName}/git/blobs/README.md`, {
        headers: headers
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = atob(data.content);
    return content;
}