import { useEffect, useState } from 'react';
import {
    Button, Card, CardBody, CardFooter, CardHeader, Center, Heading,
    Spinner, Text
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
                    per_page: 10
                });

                const currentMapappsRepoData = gitHubRepoData.data.filter((repo: any) => repo.topics.includes('4x') && repo.topics.includes('mapapps') && !repo.archived);

                const newsData = [];
                for (let i = 0; i < 5; i++) {
                    try {
                        const gitHubNewsData = await octokit.request('GET /repos/{owner}/{repo}/releases', {
                            owner: 'conterra',
                            repo: currentMapappsRepoData[i].name
                        });

                        const latestRelease = gitHubNewsData.data.find((release: any) => !release.prerelease);
                        if (latestRelease) {
                            newsData.push({
                                repoTitle: currentMapappsRepoData[i].name,
                                ...latestRelease
                            });
                        }
                    } catch (error) {
                        console.error('Error fetching API data:', error);
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
                {gitHubNewsData ? gitHubNewsData.map((d: any, i: any) => (
                    <div key={`${d.id}-${i}`} className='col-md-4'>
                        <Card>
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