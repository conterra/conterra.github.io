import config from './config.json';

export class BundleOverviewController {

    public async fetchGitHubRepoData(octokit: any): Promise<any> {
        try {
            const gitHubRepoData = await octokit.request('GET /orgs/{org}/repos', {
                org: 'conterra',
                type: 'name',
                sort: 'full_name',
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

    public sortRepositoriesByTopics(repoData: any[]) {
        const topics = config.gitHubRepoTopicList.topics;
        const sortedRepos: any = [];

        topics.forEach((topic) => {
            sortedRepos.push({
                topic: topic.displayValue,
                repos: repoData.filter((repo: any) => repo.topics.includes(topic.topic))
            });
        });

        const unmatchedRepos = repoData.filter((repo: any) =>
            !topics.some((topic) => repo.topics.includes(topic))
        );

        sortedRepos.push({
            topic: "Weitere Funktionen",
            repos: unmatchedRepos
        });

        return sortedRepos;
    };
}