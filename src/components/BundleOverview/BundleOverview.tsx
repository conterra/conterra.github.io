import { useEffect, useState } from 'react';
import {
    Box, Button, Card, CardBody, CardFooter, CardHeader, Center,
    Heading, Image, SimpleGrid, Spinner, Stack, StackDivider, Text
} from '@chakra-ui/react'
import { Octokit } from "@octokit/core";

import "./BundleOverview.css";

export const BundleOverview = () => {
    const [gitHubRepoData, setGitHubRepoData] = useState<any>(null);

    useEffect(() => {
        const fetchGitHubRepoData = async () => {
            try {
                const octokit = new Octokit({
                    auth: process.env.REACT_APP_GITHUB_TOKEN
                });

                const gitHubRepoData = await octokit.request('GET /orgs/{org}/repos', {
                    org: 'conterra',
                    type: 'public',
                    sort: 'updated',
                    per_page: 100
                });

                setGitHubRepoData(gitHubRepoData.data.filter((repo: any) =>
                    repo.topics.includes('4x') && repo.topics.includes('mapapps') && !repo.archived
                ));
            } catch (error) {
                console.error('Error fetching API data:', error);
            }
        };

        fetchGitHubRepoData();
    }, []);

    return (
        <>
            <div className="page-content__container repo-overview__container">
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                    {gitHubRepoData ? gitHubRepoData.map((d: any, i: any) => (
                        <div key={`${d.name}-${i}`} className='col-md-4'>
                            <Card >

                                <CardHeader>
                                    <Heading size='sm'>{d.name}</Heading>
                                </CardHeader>

                                <CardBody>
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Beschreibung
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                {d.description}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Letztes Update
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                {d.updated_at}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Zustand
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                {d.open_issues_count} offene Issues
                                                <Image src={`https://github.com/conterra/${d.name}/actions/workflows/devnet-bundle-snapshot.yml/badge.svg`} />
                                            </Text>
                                        </Box>
                                    </Stack>
                                </CardBody>

                                <CardFooter>
                                    <Button variant='solid' colorScheme='blue' onClick={() => window.open(`${d.svn_url}`, '_blank')}>
                                        Detailseite öffnen
                                    </Button>
                                </CardFooter>

                            </Card>
                        </div>
                    )) :
                        <div>
                            <div>
                                <Center h="full">
                                    <Spinner size={'xl'} />
                                </Center>
                            </div>
                        </div>
                    }
                </SimpleGrid>
            </div>
        </>
    );
}