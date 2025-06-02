import { useEffect, useMemo, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Center, Heading, Spinner, Stack, Text, Image, ButtonGroup } from '@chakra-ui/react'
import { Octokit } from "@octokit/core";
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import { MdOpenInNew, MdOutlineExitToApp } from "react-icons/md";

import "./NewsPage.css";
import { NewsPageController } from './NewsPageController';

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
                        :
                        gitHubNewsData.map((release: any, i: any) => (
                            <div key={`${release.id}-${i}`} className='col-md-4'>

                                <Card
                                    direction={{ base: 'column', sm: 'row' }}
                                    overflow='hidden'
                                    variant='outline'
                                >
                                    <Image
                                        objectFit='cover'
                                        maxW={{ base: '100%', sm: '400px' }}
                                        src={`https://raw.githubusercontent.com/conterra/${release.repoTitle}/refs/heads/main/screenshot.JPG`}
                                        alt='Bundle Screenshot'
                                    />

                                    <Stack>
                                        <CardBody>
                                            <Heading textTransform='capitalize' size="md">{controller.formatRepositoryName(release.repoTitle)}: {release.name} ({controller.getDate(release.published_at)})</Heading>
                                            <Text>{parse(DOMPurify.sanitize(release.body.replace(/\n/g, '<br />')))}</Text>
                                        </CardBody>
                                        <CardFooter>
                                            <ButtonGroup>
                                                <Button leftIcon={<MdOpenInNew />} as="a" href={release.html_url} target="_blank" rel="noopener noreferrer">
                                                    Zum Repository
                                                </Button>
                                                {release.homepage && (
                                                    <Button leftIcon={<MdOutlineExitToApp />} variant='solid' colorScheme='blue' onClick={() => window.open(`${release.homepage}`, '_blank')}>
                                                        Zur Demo
                                                    </Button>
                                                )}
                                            </ButtonGroup>
                                        </CardFooter>
                                    </Stack>
                                </Card>
                            </div>
                        ))
                }
            </div>
        </>
    );
}