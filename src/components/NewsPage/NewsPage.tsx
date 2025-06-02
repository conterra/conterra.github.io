import { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Center, Heading, Spinner, Text } from '@chakra-ui/react'
import { Octokit } from "@octokit/core";

import "./NewsPage.css";
import { NewsPageController } from './NewsPageController';
import { NewsCard } from './subcomponents/NewsCard';

export const NewsPage = () => {
    const [gitHubNewsData, setGitHubNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const octokit = useMemo(() => new Octokit({
        auth: process.env.REACT_APP_GITHUB_TOKEN
    }), []);
    const controller = useMemo(() => new NewsPageController(), []);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        controller.fetchGitHubRepoData(octokit)
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
    }, [controller, octokit]);

    return (
        <>
            <div className="page-content__container newspage__container">
                <Heading size='lg' className='repo-overview__topic-section-header'>Neueste Releases</Heading>
                {loading ?
                    <div>
                        <Center h="50vh">
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
                        : gitHubNewsData.map(
                            (release: any, i: any) => (
                                <div key={`${release.id}-${i}`} className='col-md-4'>
                                    <NewsCard release={release} controller={controller} />
                                </div>
                            )
                        )
                }
            </div>
        </>
    );
}