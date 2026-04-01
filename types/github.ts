interface GitHubRepository {
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
}
export type { GitHubRepository };