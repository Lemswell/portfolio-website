
export async function fetchRepo() {
    const response = await fetch("https://api.github.com/users/Lemswell/repos", {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github.json"
        }
    });
    
    // check response is ok
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repos = await response.json();

    
}


