interface GithubRepository {
    html_url: string;
    name: string;
    description: string | null;
    created_at: string;
    pushed_at: string;
    language: string | null;
    topics: string[];
}
export type { GithubRepository };