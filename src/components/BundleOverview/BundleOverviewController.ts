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
                const filteredrepoData = repoData.filter((item: any) => !config.BundleOverview.alwaysAdditionalRepos.includes(item.name));
                sortedRepos.push({
                    topic: topic.displayValue,
                    repos: filteredrepoData.sort((a: any, b: any) => {
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
            topic: "Weitere Bundles",
            repos: unmatchedRepos
        });

        return sortedRepos;
    }

    public handleInputChange(
        searchTerm: string,
        gitHubRepoData: any[],
        setSearchItem: (value: string) => void,
        setFilteredRepos: (repos: any[]) => void,
        setSortedRepos: (repos: any[]) => void
    ): void {
        setSearchItem(searchTerm);

        if (!searchTerm) {
            setFilteredRepos(gitHubRepoData);
            setSortedRepos(this.sortRepositoriesByTopics(gitHubRepoData));
            return;
        }

        const filteredItems = gitHubRepoData.filter((repo: any) =>
            repo?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            repo?.description?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            repo?.topics?.some((topic: string) => topic.toLowerCase().includes(searchTerm?.toLowerCase()))
        );

        setFilteredRepos(filteredItems);
        setSortedRepos(this.sortRepositoriesByTopics(filteredItems));
    }

    public scrollToHeading(
        topic: string,
        headingRefs: React.MutableRefObject<{ [topic: string]: HTMLDivElement | null }>
    ): void {
        const ref = headingRefs.current[topic];
        if (ref) {
            ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    public scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}