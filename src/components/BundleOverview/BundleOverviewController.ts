
export class BundleOverviewController {

    public async fetchGitHubRepoData(octokit: any): Promise<any> {
        try {
            const gitHubRepoData = await octokit.request('GET /orgs/{org}/repos', {
                org: 'conterra',
                type: 'public',
                sort: 'updated',
                per_page: 100
            });

            const filteredData = gitHubRepoData.data.filter((repo: any) =>
                repo.topics.includes('4x') && repo.topics.includes('mapapps') && !repo.archived
            );

            return filteredData;
        }
        catch (error) {
            console.error('Error fetching API data:', error);
        }
    }

    public formatRepositoryName(name: string): string {
        return name.replace(/-/g, ' ').replace(/mapapps/g, '');
    }

    public getTimeDifferenceFromPush(pushDate: string): number {
        const date = new Date(pushDate);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - date.getTime();

        return Math.round(timeDifference / (1000 * 3600 * 24));
    }
}