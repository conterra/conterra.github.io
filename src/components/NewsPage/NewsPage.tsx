import { useEffect, useState } from 'react';
import {
    Button, Card, CardBody, CardFooter, CardHeader,
    Center, Heading, Spinner, Stack, Text, Image
} from '@chakra-ui/react'
import { Octokit } from "@octokit/core";
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import "./NewsPage.css";

export const NewsPage = () => {
    const [gitHubNewsData, setGitHubNewsData] = useState<any>(null);

    useEffect(() => {
        const octokit = new Octokit({
            auth: process.env.REACT_APP_GITHUB_TOKEN
        });

        const fetchGitHubRepoData = async () => {
            try {
                const gitHubRepoData = await octokit.request('GET /orgs/{org}/repos', {
                    org: 'conterra',
                    type: 'public',
                    sort: 'updated',
                    per_page: 30
                });

                const currentMapappsRepoData = gitHubRepoData.data.filter((repo: any) =>
                    repo.topics.includes('4x') && repo.topics.includes('mapapps') && !repo.archived
                );

                const newsData = [];
                for (const repo of currentMapappsRepoData) {
                    if (newsData.length > 5) break;
                    try {
                        const gitHubNewsData = await octokit.request('GET /repos/{owner}/{repo}/releases', {
                            owner: 'conterra',
                            repo: repo.name
                        });

                        const latestRelease = gitHubNewsData.data[0];
                        if (latestRelease && !latestRelease.prerelease) {
                            newsData.push({
                                repoTitle: repo.name,
                                ...latestRelease
                            });
                        }
                    } catch (error) {
                        console.error(`Error fetching releases for repo ${repo.name}:`, error);
                    }
                }

                setGitHubNewsData(newsData);
            } catch (error) {
                console.error('Error fetching API data:', error);
            }
        };
        fetchGitHubRepoData();
    }, []);

    return (
        <>
            <div className="page-content__container newspage__container">
                <Heading size='lg' className='repo-overview__topic-section-header'>Neueste Releases</Heading>
                {gitHubNewsData ? gitHubNewsData.map((d: any, i: any) => (
                    <div key={`${d.id}-${i}`} className='col-md-4'>

                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '400px' }}
                                src={`https://raw.githubusercontent.com/conterra/${d.repoTitle}/refs/heads/main/screenshot.JPG`}
                                alt='Bundle Screenshot'
                            />

                            <Stack>
                                <CardHeader>
                                    <Heading size="md">{d.repoTitle}: {d.name}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>{parse(DOMPurify.sanitize(d.body.replace(/\n/g, '<br />')))}</Text>
                                </CardBody>

                                <CardFooter>
                                    <Button as="a" href={d.html_url} target="_blank" rel="noopener noreferrer">
                                        View Repository
                                    </Button>
                                </CardFooter>
                            </Stack>
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
            </div>
        </>
    );
}