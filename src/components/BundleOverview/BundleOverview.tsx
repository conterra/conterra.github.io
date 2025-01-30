import { useEffect, useMemo, useState } from 'react';
import {
    Box, Button, Card, CardBody, CardFooter, CardHeader, Center,
    Heading, Image, SimpleGrid, Spinner, Stack, StackDivider, Text
} from '@chakra-ui/react'
import { Octokit } from "@octokit/core";

import "./BundleOverview.css";
import { BundleOverviewController } from './BundleOverviewController';

import { MdOutlineExitToApp } from "react-icons/md";

export const BundleOverview = () => {
    const [gitHubRepoData, setGitHubRepoData] = useState<any>(null);
    
    const octokit = useMemo(() => new Octokit({
        auth: process.env.REACT_APP_GITHUB_TOKEN
    }), []);

    const controller = useMemo(() => new BundleOverviewController(), []);

    useEffect(() => {
        controller.fetchGitHubRepoData(octokit).then((data) => {
            setGitHubRepoData(data);
        });
    }, [controller, octokit]);

    return (
        <>
            <div className="page-content__container repo-overview__container">
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                    {gitHubRepoData ? gitHubRepoData.map((d: any, i: any) => (
                        <div key={`${d.name}-${i}`} className='col-md-4'>
                            <Card >

                                <CardHeader>
                                    <Heading textTransform='capitalize' size='sm'>
                                        {controller.formatRepositoryName(d.name)}
                                    </Heading>
                                </CardHeader>

                                <CardBody>
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        <Box>
                                            <Heading size='xs'>
                                                Beschreibung
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                {d.description}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Heading size='xs'>
                                                Zustand
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                <Text pt='2' fontSize='sm'>
                                                    <Image src={`https://github.com/conterra/${d.name}/actions/workflows/devnet-bundle-snapshot.yml/badge.svg`} />
                                                    Letztes Update: Vor {controller.getTimeDifferenceFromPush(d.updated_at)} Tagen
                                                </Text>
                                                {d.open_issues_count} offene Issues

                                            </Text>
                                        </Box>
                                    </Stack>
                                </CardBody>

                                <CardFooter>
                                    <Button leftIcon={<MdOutlineExitToApp />} variant='solid' onClick={() => window.open(`${d.svn_url}`, '_blank')}>
                                        Zur Detailseite
                                    </Button>
                                    {d.homepage && (
                                        <Button leftIcon={<MdOutlineExitToApp />} variant='solid' colorScheme='blue' onClick={() => window.open(`${d.homepage}`, '_blank')}>
                                            Zur Demo
                                        </Button>
                                    )}
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