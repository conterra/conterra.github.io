import config from '../../config.json';

export class BundleOverviewController {
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
        const topics = config.BundleOverview.gitHubRepoTopicList.topics;
        const sortedRepos: any = [];

        topics.forEach((topic) => {
            if (topic.topic === "all") {
                sortedRepos.push({
                    topic: topic.displayValue,
                    repos: repoData.sort((a: any, b: any) => {
                        return a.name.localeCompare(b.name);
                    })
                });
            } else {
                sortedRepos.push({
                    topic: topic.displayValue,
                    repos: repoData.filter((repo: any) => repo.topics.includes(topic.topic))
                });
            }
        });

        const unmatchedRepos = repoData.filter((repo: any) =>
            !topics.some((topic) => repo.topics.includes(topic.topic))
        );

        sortedRepos.push({
            topic: "Weitere Funktionen",
            repos: unmatchedRepos
        });

        return sortedRepos;
    };
}