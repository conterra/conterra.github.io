import {
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {
    Center,
    Flex,
    Heading,
    SimpleGrid,
    Spinner,
    Box,
    Text,
    Card,
    CardBody
} from '@chakra-ui/react'
import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";

import "./BundleOverview.css";
import { BundleOverviewController } from './BundleOverviewController';
import { OverviewCard } from './subcomponents/OverviewCard';
import { SearchBar } from './subcomponents/SearchBar';
import { Minimap } from './subcomponents/Minimap';

export const BundleOverview = () => {
    const headingRefs = useRef<{ [topic: string]: HTMLDivElement | null }>({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gitHubRepoData, setGitHubRepoData] = useState<any>(null);
    const [searchItem, setSearchItem] = useState('');
    const [filteredRepos, setFilteredRepos] = useState(gitHubRepoData);
    const [sortedRepos, setSortedRepos] = useState<any>(null);
    const [activeTopic, setActiveTopic] = useState<string | null>(null);

    const MyOctokit = Octokit.plugin(paginateRest);
    const octokit = useMemo(() => new MyOctokit({
        auth: process.env.REACT_APP_GITHUB_TOKEN
    }), []);
    const controller = useMemo(() => new BundleOverviewController(), []);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        controller.fetchGitHubRepoData(octokit)
            .then((data) => {
                if (isMounted) {
                    if (data === undefined) {
                        setError("Fehler beim Laden der Releases.");
                        setGitHubRepoData([]);
                        setFilteredRepos([]);
                        setSortedRepos([]);
                    } else {
                        setGitHubRepoData(data);
                        setFilteredRepos(data);
                        setSortedRepos(controller.sortRepositoriesByTopics(data));
                    }

                    setLoading(false);
                }
            });

        return () => { isMounted = false; };
    }, [controller, octokit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        if (!searchTerm) {
            setFilteredRepos(gitHubRepoData);
            setSortedRepos(controller.sortRepositoriesByTopics(gitHubRepoData));

            return;
        } else {
            const filteredItems = gitHubRepoData.filter((repo: any) =>
                repo?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                repo?.description?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                repo?.topics?.some((topic: string) => topic.toLowerCase().includes(searchTerm?.toLowerCase()))
            );

            setFilteredRepos(filteredItems);
            setSortedRepos(controller.sortRepositoriesByTopics(filteredRepos));
        }
    };

    const scrollToHeading = (topic: string) => {
        const ref = headingRefs.current[topic];
        if (ref) {
            ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Intersection Observer for active topic
    useEffect(() => {
        if (!sortedRepos) return;
        const topics: string[] = sortedRepos.map((sr: { topic: string }) => sr.topic);
        const refsSnapshot = { ...headingRefs.current };
        const observer = new window.IntersectionObserver(
            (entries) => {
                const visible = entries.filter(e => e.isIntersecting);
                if (visible.length > 0) {
                    setActiveTopic(visible[0].target.getAttribute('data-topic'));
                }
            },
            {
                root: null,
                rootMargin: '-100px 0px 0px 0px', // account for sticky header
                threshold: 0.3
            }
        );
        topics.forEach((topic: string) => {
            const ref = refsSnapshot[topic];
            if (ref) {
                observer.observe(ref);
            }
        });
        return () => {
            topics.forEach((topic: string) => {
                const ref = refsSnapshot[topic];
                if (ref) observer.unobserve(ref);
            });
        };
    }, [sortedRepos]);

    return (
        <>
            <div className="page-content__container repo-overview__container" style={{ position: 'relative' }}>
                <Flex direction="row" align="flex-start" width="100%">
                    {/* Main Content (Left) */}
                    <Box flex="1" pr={8}>
                        <Box width="100%" mt={6}>
                            {loading ?
                               <div>
                                    <Center h="50vh" width="100vw" position="fixed" left={0} top={0} zIndex={2000} bg="rgba(255,255,255,0.7)">
                                        <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='#005587'
                                            size='xl'
                                        />
                                    </Center>
                                </div>
                                : error ?
                                    <Center h="40vh">
                                        <Card bg="red.50" borderColor="red.300" borderWidth={1} p={6} minW="350px" boxShadow="sm">
                                            <CardBody>
                                                <Heading size="md" color="red.600" mb={2}>Fehler</Heading>
                                                <Text color="red.700">{error}</Text>
                                            </CardBody>
                                        </Card>
                                    </Center>
                                    : sortedRepos.map(
                                        (sortedRepo: { topic: string, repos: any[] }) => (
                                            sortedRepo.repos.length >= 1 && (
                                                <div key={sortedRepo.topic} className='repo-overview__topic-section'>
                                                    <Flex direction={'column'}>
                                                        <Heading
                                                            size='lg'
                                                            className='repo-overview__topic-section-header'
                                                            ref={el => headingRefs.current[sortedRepo.topic] = el}
                                                            data-topic={sortedRepo.topic}
                                                            style={{ scrollMarginTop: 100 }}
                                                        >
                                                            {sortedRepo.topic}
                                                        </Heading>
                                                        <SimpleGrid spacing={7} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                                                            {sortedRepo.repos.map((repository: any, i: any) => (
                                                                <div key={`${repository.name}-${i}`} >
                                                                    <OverviewCard repository={repository} controller={controller} />
                                                                </div>
                                                            ))}
                                                        </SimpleGrid>
                                                    </Flex>
                                                </div>
                                            )
                                        ))
                            }
                        </Box>
                    </Box>
                    {/* Sidebar (Right) */}
                    <Box minW="320px" maxW="400px" width="28%" className="repo-overview__sidebar">
                        <SearchBar searchItem={searchItem} handleInputChange={handleInputChange} />
                        <Minimap sortedRepos={sortedRepos || []} scrollToHeading={scrollToHeading} activeTopic={activeTopic || undefined} />
                    </Box>
                </Flex>
            </div>
        </>
    );
}