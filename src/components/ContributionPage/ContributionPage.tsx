import {
    useEffect,
    useState
} from 'react';

import { Card, CardBody, CardFooter, Stack, Heading, Text, ButtonGroup, Button, Box, CardHeader } from '@chakra-ui/react';
import { MdOpenInNew, MdMailOutline } from "react-icons/md";
import "./ContributionPage.css";
import { Leaderboard } from "./subcomponents/Leaderboard";
import { PieChart } from "./subcomponents/PieChart";
import config from "../../config.json";

import type { Issue, Contributor } from "../../api";

export const ContributionPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [issueData, setIssueData] = useState<Issue[]>([]);

    const leaderboardData = config.leaderboardData;

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        fetch('/data/highlighted_issues.json')
            .then(res => res.json())
            .then((data) => {
                if (isMounted) {
                    if (!data) {
                        setError("Fehler beim Laden der Releases.");
                        setIssueData([]);
                    } else {
                        setIssueData(data);
                    }
                    setLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setError("Fehler beim Laden der Releases.");
                    setIssueData([]);
                    setLoading(false);
                }
            });

        return () => { isMounted = false; };
    }, []);

    return (
        <div className="contribution-page horizontal-layout">
            {/* <div className="leaderboards-row">
                <Leaderboard title="Top Contributors" entries={leaderboardData[0]} vertical />
                <Leaderboard title="Most Issues Closed" entries={leaderboardData[1]} vertical />
                <Leaderboard title="Most Reviews" entries={leaderboardData[2]} vertical />
            </div> */}
            {loading ? (
                <div className="loading-section">
                    <p>Loading...</p>
                </div>
            ) : error ? (
                <div className="error-section">
                    <p>{error}</p>
                </div>
            ) :
                <div className="issues-section">
                    <Heading size='lg' className='repo-overview__topic-section-header' mb={6}>Highlighted Issues</Heading>
                    <div className="issue-list">
                        {issueData.map((issue: Issue, index: number) => (
                            <Card key={issue.id || index}>
                                <CardHeader>
                                    <Heading size="md">{issue.title}</Heading>
                                </CardHeader>
                                <CardBody py={6}>
                                    <Box display="flex" flexDirection="column" gap={6}>
                                        <Box>
                                            <Text lineHeight="1.6" color="gray.700">
                                                {issue.description}
                                            </Text>
                                        </Box>

                                        <Box display="flex" flexDirection="column" gap={2}>
                                            <Box display="flex" flexDirection="row" gap={6}>
                                                <Box>
                                                    <Text
                                                        fontSize="sm"
                                                        fontWeight="semibold"
                                                        color="gray.700"
                                                    >
                                                        Schätzung: {issue.estimatedExpenses} PT
                                                    </Text>
                                                </Box>

                                                <Box flex="1">
                                                    <Text
                                                        fontSize="sm"
                                                        fontWeight="semibold"
                                                        color="gray.700"
                                                    >
                                                        Supporters:
                                                    </Text>
                                                </Box>
                                            </Box>

                                            <Box display="flex" flexDirection="row" gap={6} alignItems="center">
                                                <Box>
                                                    <PieChart
                                                        data={issue.contributors.map((c: Contributor) => c.value)}
                                                        colors={issue.contributors.map((c: Contributor) => c.color)}
                                                        size={120}
                                                    />
                                                </Box>

                                                <Box flex="1">
                                                    <Stack spacing={2}>
                                                        {issue.contributors.map((contributor: Contributor, idx: number) => (
                                                            <Box
                                                                key={contributor.id || idx}
                                                                display="flex"
                                                                alignItems="center"
                                                                gap={3}
                                                                fontSize="sm"
                                                                p={3}
                                                                bg="gray.50"
                                                                borderRadius="md"
                                                                border="1px solid"
                                                                borderColor="gray.200"
                                                            >
                                                                <Box
                                                                    w={3}
                                                                    h={3}
                                                                    borderRadius="full"
                                                                    bg={contributor.color}
                                                                    flexShrink={0}
                                                                />
                                                                <Text color="gray.700" fontWeight="medium">
                                                                    {contributor.name}
                                                                </Text>
                                                                <Text
                                                                    color="gray.500"
                                                                    fontSize="xs"
                                                                    fontWeight="semibold"
                                                                    ml="auto"
                                                                >
                                                                    {contributor.value} PT
                                                                </Text>
                                                            </Box>
                                                        ))}
                                                    </Stack>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardBody>
                                <CardFooter pt={0}>
                                    <ButtonGroup
                                        spacing={3}
                                        flexWrap="wrap"
                                        gap={2}
                                        w="full"
                                        justifyContent={{ base: "stretch", sm: "flex-start" }}
                                    >
                                        <Button
                                            leftIcon={<MdOpenInNew />}
                                            variant="outline"
                                            colorScheme="secondary"
                                            size="sm"
                                            onClick={() => window.open(`${issue.link}`, '_blank')}
                                            flex={{ base: "1", sm: "0" }}
                                            minW="140px"
                                        >
                                            Zur Detailseite
                                        </Button>
                                        <Button
                                            leftIcon={<MdMailOutline />}
                                            variant="solid"
                                            colorScheme="primary"
                                            size="sm"
                                            onClick={() => window.location.href = `mailto:${issue.contact}?subject=#${encodeURIComponent(issue.id)} ${encodeURIComponent(issue.title)}`}
                                            flex={{ base: "1", sm: "0" }}
                                            minW="140px"
                                        >
                                            E-Mail Kontakt
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>}
        </div>
    );
}

export default ContributionPage;