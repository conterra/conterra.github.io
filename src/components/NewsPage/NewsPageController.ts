export class NewsPageController {

    fetchGitHubRepoData = async (octokit: any) => {
        try {
            const gitHubRepoData = await octokit.paginate('GET /orgs/{org}/repos', {
                org: 'conterra',
                type: 'public',
                sort: 'updated',
                per_page: 100
            });

            const currentMapappsRepoData = gitHubRepoData.filter((repo: any) =>
                repo.topics.includes('4x') && repo.topics.includes('mapapps') && !repo.archived
            );
            const allLatestReleases: any[] = []
            await Promise.all(currentMapappsRepoData.map(async (repo: any) => {
                try {
                    const releaseData = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
                        owner: 'conterra',
                        repo: repo.name
                    })

                    if (releaseData && releaseData?.data && !releaseData?.data?.prerelease) {
                        allLatestReleases.push(
                            { repo: repo, release: releaseData.data }
                        )
                    }
                } catch (error) {
                    console.warn(`Error fetching latest release for repo ${repo.name}:`, error);
                }
            }));

            const sortedReleases = allLatestReleases
                .filter((item: any) => item && item.release && item.release.published_at)
                .sort((a: any, b: any) => new Date(b.release.published_at).getTime() - new Date(a.release.published_at).getTime());
            const newsData: any[] = [];
            for (let i = 0; i < Math.min(5, sortedReleases.length); i++) {
                const latestRelease = sortedReleases[i];
                newsData.push({
                    repoTitle: latestRelease.repo.name,
                    homepage: latestRelease.repo.homepage,
                    date: latestRelease.release.published_at,
                    ...latestRelease.release
                });
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