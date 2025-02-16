const token = "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"; // Replace with a freshly generated token
const owner = "procatt182";
const repo = "bot";
const workflow = "main.yml";  // Make sure the filename matches exactly with your GitHub workflow
const branch = "main";

async function isWorkflowRunning() {
    const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/runs?status=in_progress&branch=${branch}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json"
        }
    });

    if (!response.ok) {
        // Enhanced logging for debugging
        const errorDetails = await response.text();
        console.error(`Error fetching workflow runs: ${response.statusText} - Status Code: ${response.status}`);
        console.error(`Error details: ${errorDetails}`);
        return false;
    }

    const data = await response.json();
    console.log("Fetched workflow runs data:", data);

    const activeRuns = data.workflow_runs.filter(run => run.status === "in_progress" || run.status === "queued");
    return activeRuns.length > 0;
}

async function triggerGitHubAction() {
    if (await isWorkflowRunning()) {
        alert("The bot is already running.");
        return;
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ref: branch })
    });

    if (response.ok) {
        alert("The bot was triggered successfully!");
    } else {
        // Log the error details for debugging
        const errorDetails = await response.text();
        console.error(`Error triggering workflow: ${response.statusText} - Status Code: ${response.status}`);
        console.error(`Error details: ${errorDetails}`);
        alert("Something went wrong: " + response.statusText);
    }
}
