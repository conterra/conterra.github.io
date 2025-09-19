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

// Helper component for contributor display
const ContributorItem = ({ contributor, idx }: { contributor: Contributor, idx: number }) => (
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
);

// Helper component for issue card content
const IssueCardContent = ({ issue }: { issue: Issue }) => (
    <>
        <Text lineHeight="1.6" color="gray.700" mb={6}>
            {issue.description}
        </Text>

        <Box display="flex" flexDirection="row" gap={6} mb={2}>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                Schätzung: {issue.estimatedExpenses} PT
            </Text>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" flex="1">
                Supporters:
            </Text>
        </Box>

        <Box display="flex" flexDirection="row" gap={6} alignItems="center">
            <PieChart
                data={issue.contributors.map((c: Contributor) => c.value)}
                colors={issue.contributors.map((c: Contributor) => c.color)}
                size={120}
            />
            <Stack spacing={2} flex="1">
                {issue.contributors.map((contributor: Contributor, idx: number) => (
                    <ContributorItem key={contributor.id || idx} contributor={contributor} idx={idx} />
                ))}
            </Stack>
        </Box>
    </>
);

// Helper component for issue card actions
const IssueCardActions = ({ issue }: { issue: Issue }) => (
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
);

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
                if (!isMounted) return;

                if (!data) {
                    setError("Fehler beim Laden der Releases.");
                    setIssueData([]);
                } else {
                    setIssueData(data);
                }
                setLoading(false);
            })
            .catch(() => {
                if (!isMounted) return;

                setError("Fehler beim Laden der Releases.");
                setIssueData([]);
                setLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    // Early returns for loading and error states
    if (loading) {
        return (
            <div className="contribution-page horizontal-layout">
                <div className="loading-section">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="contribution-page horizontal-layout">
                <div className="error-section">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <Box width="100%" mt={6} p={5} pt={10}>
            <Heading size='lg' mb={6} mt={6}>
                Community Entwicklungen
            </Heading>
            <div className="issue-list">
                {issueData.map((issue: Issue, index: number) => (
                    <Card key={issue.id || index}>
                        <CardHeader>
                            <Heading size="md">{issue.title}</Heading>
                        </CardHeader>
                        <CardBody py={6}>
                            <IssueCardContent issue={issue} />
                        </CardBody>
                        <CardFooter pt={0}>
                            <IssueCardActions issue={issue} />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Box>
    );
}

export default ContributionPage;