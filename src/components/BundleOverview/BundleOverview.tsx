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
    CardBody,
    Button,
    Collapse,
    useDisclosure,
    IconButton
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon, ChevronUpIcon as ArrowUpIcon } from '@chakra-ui/icons'

import "./BundleOverview.css";
import { BundleOverviewController } from './BundleOverviewController';
import { OverviewCard } from './subcomponents/OverviewCard';
import { SearchBar } from './subcomponents/SearchBar';
import { Minimap } from './subcomponents/Minimap';

export const BundleOverview = () => {
    const headingRefs = useRef<{ [topic: string]: HTMLDivElement | null }>({});
    const { isOpen, onToggle } = useDisclosure();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gitHubRepoData, setGitHubRepoData] = useState<any>(null);
    const [searchItem, setSearchItem] = useState('');
    const [filteredRepos, setFilteredRepos] = useState(gitHubRepoData);
    const [sortedRepos, setSortedRepos] = useState<any>(null);
    const [activeTopic, setActiveTopic] = useState<string | null>(null);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const controller = useMemo(() => new BundleOverviewController(), []);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        fetch('/data/base_data.json')
            .then(res => res.json())
            .then((data) => {
                if (isMounted) {
                    if (!data) {
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
            })
            .catch(() => {
                if (isMounted) {
                    setError("Fehler beim Laden der Releases.");
                    setGitHubRepoData([]);
                    setFilteredRepos([]);
                    setSortedRepos([]);
                    setLoading(false);
                }
            });

        return () => { isMounted = false; };
    }, [controller]);

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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle scroll to show/hide back to top button
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                <Flex direction={{ base: "column", lg: "row" }} align="flex-start" width="100%">
                    {/* Sidebar - appears first on mobile, second on desktop */}
                    <Box
                        minW={{ base: "100%", lg: "320px" }}
                        maxW={{ base: "100%", lg: "400px" }}
                        width={{ base: "100%", lg: "28%" }}
                        className="repo-overview__sidebar"
                        order={{ base: 1, lg: 2 }}
                        mb={{ base: 0, lg: 0 }}
                        pl={{ base: 0, lg: 8 }}
                        pr={{ base: 6, lg: 0 }}
                        position={{ base: "relative", lg: "sticky" }}
                        top={{ base: "10px", lg: "80px" }}
                        alignSelf="flex-start"
                        height={{ base: "auto", lg: "fit-content" }}
                    >
                        <SearchBar searchItem={searchItem} handleInputChange={handleInputChange} />
                        
                        {/* Mobile Collapsible Minimap */}
                        <Box display={{ base: 'block', lg: 'none' }}>
                            <Button
                                onClick={onToggle}
                                variant="outline"
                                size="sm"
                                width="100%"
                                mb={2}
                                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                justifyContent="space-between"
                            >
                                Navigation
                            </Button>
                            <Collapse in={isOpen} animateOpacity>
                                <Minimap sortedRepos={sortedRepos || []} scrollToHeading={scrollToHeading} activeTopic={activeTopic || undefined} />
                            </Collapse>
                        </Box>
                        
                        {/* Desktop Always Visible Minimap */}
                        <Box display={{ base: 'none', lg: 'block' }}>
                            <Minimap sortedRepos={sortedRepos || []} scrollToHeading={scrollToHeading} activeTopic={activeTopic || undefined} />
                        </Box>
                    </Box>

                    {/* Main content - appears second on mobile, first on desktop */}
                    <Box flex="1" pr={{ base: 0, lg: 8 }} order={{ base: 2, lg: 1 }}>
                        <Box width="100%">
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
                                                            size='lg' mb={6} mt={6}
                                                            ref={el => { headingRefs.current[sortedRepo.topic] = el; }}
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
                </Flex>
                
                {/* Floating Back to Top Button - Mobile Only */}
                {showBackToTop && (
                    <IconButton
                        aria-label="Back to top"
                        icon={<ArrowUpIcon />}
                        position="fixed"
                        bottom="20px"
                        right="20px"
                        size="lg"
                        colorScheme="blue"
                        borderRadius="full"
                        boxShadow="lg"
                        zIndex={1000}
                        display={{ base: 'flex', lg: 'none' }}
                        onClick={scrollToTop}
                        _hover={{ transform: 'scale(1.1)' }}
                        transition="all 0.2s"
                    />
                )}
            </div>
        </>
    );
}