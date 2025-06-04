import fs from 'fs';
import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";

const MyOctokit = Octokit.plugin(paginateRest);
const octokit = new MyOctokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN
});

(async () => {
    const gitHubRepoData = await octokit.paginate('GET /orgs/{org}/repos', {
        org: 'conterra',
        type: 'public',
        sort: 'updated',
        per_page: 100
    });

    const activeRepoData = gitHubRepoData.filter((repo: any) =>
        repo.topics.includes('4x') && repo.topics.includes('mapapps') && !repo.archived
    );

    fs.writeFileSync('public/base_data.json', JSON.stringify(activeRepoData));
})();