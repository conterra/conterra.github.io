import { useEffect, useMemo, useState } from 'react';
import {
    Box, Button, Card, CardBody, CardFooter, CardHeader,
    Center, Flex, Heading, Image, Input, InputGroup,
    InputLeftElement, SimpleGrid, Spinner, Stack, StackDivider, Text
} from '@chakra-ui/react'
import { Octokit } from "@octokit/core";

import "./BundleOverview.css";
import { BundleOverviewController } from './BundleOverviewController';

import { MdSearch, MdOutlineExitToApp } from "react-icons/md";

export const BundleOverview = () => {
    const [gitHubRepoData, setGitHubRepoData] = useState<any>(null);
    const [searchItem, setSearchItem] = useState('');
    const [filteredRepos, setFilteredRepos] = useState(gitHubRepoData);
    const [sortedRepos, setSortedRepos] = useState<any>(null);

    const octokit = useMemo(() => new Octokit({
        auth: process.env.REACT_APP_GITHUB_TOKEN
    }), []);
    const controller = useMemo(() => new BundleOverviewController(), []);

    useEffect(() => {
        controller.fetchGitHubRepoData(octokit).then((data) => {
            setGitHubRepoData(data);
            setFilteredRepos(data);
            setSortedRepos(controller.sortRepositoriesByTopics(data));
        });
    }, [controller, octokit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        if (!searchTerm) {
            setFilteredRepos(gitHubRepoData);
            return;
        }

        const filteredItems = gitHubRepoData.filter((repo: any) =>
            repo?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            repo?.description?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            repo?.topics?.some((topic: string) => topic.toLowerCase().includes(searchTerm?.toLowerCase()))
        );

        setFilteredRepos(filteredItems);
        setSortedRepos(controller.sortRepositoriesByTopics(filteredRepos));
    };

    return (
        <>
            <div className="page-content__container repo-overview__container">
                <InputGroup flex="1" >
                    <InputLeftElement pointerEvents='none'>
                        <MdSearch />
                    </InputLeftElement>
                    <Input type="text" value={searchItem} onChange={handleInputChange} placeholder="Developer Network Bundles durchsuchen" />
                </InputGroup>

                {sortedRepos ? sortedRepos.map((sortedRepo: { topic: string, repos: any[] }) => (
                    sortedRepo.repos.length >= 1 && (
                        <div key={sortedRepo.topic} className='repo-overview__topic-section'>
                            <Flex direction={'column'}>
                                <Heading size='lg' className='repo-overview__topic-section-header'>{sortedRepo.topic}</Heading>
                                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                                    {sortedRepo.repos.map((repository: any, i: any) => (
                                        <div key={`${repository.name}-${i}`} className='col-md-4'>
                                            <Card>
                                                <CardHeader>
                                                    <Heading textTransform='capitalize' size='sm'>
                                                        {controller.formatRepositoryName(repository.name)}
                                                    </Heading>
                                                </CardHeader>
                                                <CardBody>
                                                    <Stack divider={<StackDivider />} spacing='4'>
                                                        <Box>
                                                            <Heading size='xs'>Beschreibung</Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {repository.description}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs'>Zustand</Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                <Image src={`https://github.com/conterra/${repository.name}/actions/workflows/devnet-bundle-snapshot.yml/badge.svg`} />
                                                                Letztes Update: Vor {controller.getTimeDifferenceFromPush(repository.updated_at)} Tagen
                                                            </Text>
                                                            {repository.open_issues_count} offene Issues
                                                        </Box>
                                                    </Stack>
                                                </CardBody>
                                                <CardFooter>
                                                    <Button leftIcon={<MdOutlineExitToApp />} variant='solid' onClick={() => window.open(`${repository.svn_url}`, '_blank')}>
                                                        Zur Detailseite
                                                    </Button>
                                                    {repository.homepage && (
                                                        <Button leftIcon={<MdOutlineExitToApp />} variant='solid' colorScheme='blue' onClick={() => window.open(`${repository.homepage}`, '_blank')}>
                                                            Zur Demo
                                                        </Button>
                                                    )}
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    ))}
                                </SimpleGrid>
                            </Flex>
                        </div>
                    )
                )) : (
                    <div>
                        <div>
                            <Center h="full">
                                <Spinner size={'xl'} />
                            </Center>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}