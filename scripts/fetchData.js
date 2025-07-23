import fs from 'fs';
import dotenv from 'dotenv';
import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";

dotenv.config();
const MyOctokit = Octokit.plugin(paginateRest);
const octokit = new MyOctokit({
    auth: process.env.GITHUB_TOKEN
});

(async () => {
    const activeRepos = await fetchAndSaveActiveRepos();
    await fetchAndSaveReleaseInformation(activeRepos);
})();

async function fetchAndSaveActiveRepos() {
    const gitHubRepoData = await octokit.paginate('GET /orgs/{org}/repos', {
        org: 'conterra',
        type: 'public',
        sort: 'updated',
        per_page: 100
    });

    const activeRepoData = gitHubRepoData.filter((repo) =>
        repo.topics.includes('4x') && repo.topics.includes('mapapps') && !repo.archived
    );

    fs.writeFileSync('public/data/base_data.json', JSON.stringify(activeRepoData));
    return activeRepoData;
}

async function fetchAndSaveReleaseInformation(activeRepos) {
    const releasePromises = activeRepos.map(async (repo) => {
        try {
            const { data } = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
                owner: 'conterra',
                repo: repo.name
            });
            if (data && !data.prerelease) {
                return { repo, release: data };
            }
        } catch (error) {
            console.warn(`Error fetching latest release for repo ${repo.name}:`, error);
        }
        return null;
    });

    const allLatestReleases = (await Promise.all(releasePromises))
        .filter(item => !!item && !!item.release?.published_at);

    const newsData = allLatestReleases
        .sort((a, b) => new Date(b.release.published_at).getTime() - new Date(a.release.published_at).getTime())
        .slice(0, 10)
        .map(({ repo, release }) => ({
            repoTitle: repo.name,
            homepage: repo.homepage,
            date: release.published_at,
            ...release
        }));

    fs.writeFileSync('public/data/news_data.json', JSON.stringify(newsData));
}
