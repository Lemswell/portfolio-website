interface GithubRepository {
    id: number;
    html_url: string;
    name: string;
    description: string | null;
    created_at: string;
    pushed_at: string;
    language: string | null;
    topics: string[];
    archived: boolean;
}
export type { GithubRepository };