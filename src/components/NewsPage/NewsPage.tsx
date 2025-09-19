import { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Center, Heading, Spinner, Text, SimpleGrid, Box, useTheme } from '@chakra-ui/react'

import { NewsPageController } from './NewsPageController';
import { NewsCard } from './subcomponents/NewsCard';

export const NewsPage = () => {
    const theme = useTheme();
    const [gitHubNewsData, setGitHubNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const controller = useMemo(() => new NewsPageController(), []);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        fetch('/data/news_data.json')
            .then(res => res.json())
            .then((data) => {
                if (isMounted) {
                    if (data === undefined) {
                        setError("Fehler beim Laden der Releases.");
                        setGitHubNewsData([]);
                    } else {
                        setGitHubNewsData(data);
                    }
                    setLoading(false);
                }
            })

        return () => { isMounted = false; };
    }, [controller]);

    return (
        <>
                <Box width="100%" mt={6} p={10}>
                    {loading ?
                        <div>
                            <Center h="50vh" width="100vw" position="fixed" left={0} top={0} zIndex={2000} bg="rgba(255,255,255,0.7)">
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color={theme.colors.primaryBlue}
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
                            :
                            <>
                                <Heading size='lg' className='repo-overview__topic-section-header' mb={6}>Neueste Releases</Heading>
                                <SimpleGrid spacing={7} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                                    {gitHubNewsData.map(
                                        (release: any, i: any) => (
                                            <NewsCard key={`${release.id}-${i}`} release={release} controller={controller} />
                                        )
                                    )}
                                </SimpleGrid>
                            </>
                    }
                </Box>
        </>
    );
}