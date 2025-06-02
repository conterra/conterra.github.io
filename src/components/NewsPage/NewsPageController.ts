import config from '../../config.json';

export class NewsPageController {

    fetchGitHubRepoData = async (octokit: any) => {
        try {
            const gitHubRepoData = await octokit.request('GET /orgs/{org}/repos', {
                org: 'conterra',
                type: 'public',
                sort: 'updated',
                per_page: 30
            });

            const currentMapappsRepoData = gitHubRepoData.data.filter((repo: any) =>
                repo.topics.includes('4x') && repo.topics.includes('mapapps') && !repo.archived
            );

            const newsData = [];
            for (const repo of currentMapappsRepoData) {
                if (newsData.length > 5) break;
                try {
                    const gitHubNewsData = await octokit.request('GET /repos/{owner}/{repo}/releases', {
                        owner: 'conterra',
                        repo: repo.name
                    });

                    const latestRelease = gitHubNewsData.data[0];
                    if (latestRelease && !latestRelease.prerelease) {
                        newsData.push({
                            repoTitle: repo.name,
                            homepage: repo.homepage,
                            date: latestRelease.published_at,
                            ...latestRelease
                        });
                    }
                } catch (error) {
                    console.error(`Error fetching releases for repo ${repo.name}:`, error);
                }
            }

            return newsData;
        } catch (error) {
            console.error('Error fetching API data:', error);
        }
    };

    public formatRepositoryName(name: string): string {
        return name.replace(/-/g, ' ').replace(/mapapps/g, '');
    }

    public getDate(pushDate: string): string {
        const date = new Date(pushDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}.${month}.${year}`;
    }
}