
const token = "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";
const owner = "procatt182";
const repo = "bot";
const workflow = "main.yml";
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
        console.error("naeba se neshto: " + response.statusText);
        return false;
    }

    const data = await response.json();
    console.log("Fetched workflow runs data:", data);

    const activeRuns = data.workflow_runs.filter(run => run.status === "in_progress" || run.status === "queued");
    return activeRuns.length > 0;
}

async function triggerGitHubAction() {
    if (await isWorkflowRunning()) {
        alert("bota ve4e raboti.");
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
        alert("bota e pusnat uspeshno");
    } else {
        alert("naeba se neshto: " + response.statusText);
    }
}