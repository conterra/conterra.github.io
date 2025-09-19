import { useEffect, useMemo, useState } from 'react';
import { Center, Heading, Spinner, Text, SimpleGrid, Box, useTheme } from '@chakra-ui/react'

import { NewsPageController } from './NewsPageController';
import { NewsCard } from './subcomponents/NewsCard';

const LoadingSpinner = ({ theme }: { theme: any }) => (
    <Center
        h="50vh"
        width="100vw"
        position="fixed"
        left={0}
        top={0}
        zIndex={2000}
        bg={theme.colors.modalOverlay}
    >
        <Spinner
            thickness='4px'
            speed='1s'
            emptyColor={theme.colors.spinnerGrey}
            color={theme.colors.primaryBlue}
            size='xl'
        />
    </Center>
);

const NewsContent = ({ gitHubNewsData, controller }: { gitHubNewsData: any[], controller: NewsPageController }) => (
    <>
        <Heading size='lg' mb={6} mt={6}>Neueste Releases</Heading>
        <SimpleGrid spacing={7} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
            {gitHubNewsData.map(
                (release: any, i: any) => (
                    <NewsCard key={`${release.id}-${i}`} release={release} controller={controller} />
                )
            )}
        </SimpleGrid>
    </>
);

export const NewsPage = () => {
    const theme = useTheme();
    const [gitHubNewsData, setGitHubNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const controller = useMemo(() => new NewsPageController(), []);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetch('/data/news_data.json')
            .then(res => res.json())
            .then((data) => {
                if (isMounted) {
                    if (data === undefined) {
                        setGitHubNewsData([]);
                    } else {
                        setGitHubNewsData(data);
                    }
                    setLoading(false);
                }
            })

        return () => { isMounted = false; };
    }, [controller]);

    const renderContent = () => {
        if (loading) return <LoadingSpinner theme={theme} />;
        return <NewsContent gitHubNewsData={gitHubNewsData} controller={controller} />;
    };

    return (
        <Box width="100%" mt={6} p={10}>
            {renderContent()}
        </Box>
    );
}