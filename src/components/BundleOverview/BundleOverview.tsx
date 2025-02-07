import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader,
    Center, Flex, Heading, Image, Input, InputGroup,
    InputLeftElement, SimpleGrid, Spinner, Stack, StackDivider, Text
} from '@chakra-ui/react'
import { Octokit } from "@octokit/core";
import { useNavigate } from "react-router";

import "./BundleOverview.css";
import { BundleOverviewController } from './BundleOverviewController';

import { MdSearch, MdOpenInNew, MdOutlineExitToApp } from "react-icons/md";

export const BundleOverview = () => {
    const myRef = useRef<null | HTMLDivElement>(null);

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

        // octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        //     owner: 'conterra',
        //     repo: 'mapapps-portal-item-loader',
        //     path: 'screenshot.JPG'
        // }).then((data) => {
        //     console.log(data);
        // });
    };

    const executeScroll = () => {
        if (myRef.current) {
            myRef.current.scrollIntoView()
        }

    }

    return (
        <>
            <div className="page-content__container repo-overview__container">
                <div className="repo-overview--search-bar-container">
                    <Flex className="repo-overview--search-bar-flex">
                        <InputGroup className="repo-overview--search-bar-input" position={"fixed"} zIndex={1000}>
                            <InputLeftElement pointerEvents='none'>
                                <MdSearch />
                            </InputLeftElement>
                            <Input type="text" backgroundColor="white" value={searchItem} onChange={handleInputChange} placeholder="Developer Network Bundles durchsuchen" />
                        </InputGroup>
                    </Flex>
                </div>

                {/* <Box
                    borderLeft="1px"
                    position={"fixed"}
                    right={0}
                    h="full"
                    w="200px"
                    className="repo-overview--sidebar-container"
                >
                    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                        <Box>
                            <Text onClick={() => executeScroll()}>Test 1</Text>
                            <Text onClick={() => executeScroll()}>Test 2</Text>
                            <Text onClick={() => executeScroll()}>Test 3</Text>
                        </Box>
                    </Flex>
                </Box> */}

                {sortedRepos ? sortedRepos.map((sortedRepo: { topic: string, repos: any[] }) => (
                    sortedRepo.repos.length >= 1 && (
                        <div key={sortedRepo.topic} className='repo-overview__topic-section'>
                            <Flex direction={'column'}>
                                <Heading size='lg' className='repo-overview__topic-section-header'>{sortedRepo.topic}</Heading>

                                <SimpleGrid spacing={7} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                                    {sortedRepo.repos.map((repository: any, i: any) => (
                                        <div key={`${repository.name}-${i}`} >
                                            <Card
                                                direction={'column'}
                                                overflow='hidden'
                                                variant='elevated'>
                                                <Image
                                                    objectFit='cover'
                                                    maxW={{ base: '100%', sm: '100%' }}
                                                    src={`https://raw.githubusercontent.com/conterra/${repository.name}/refs/heads/main/screenshot.JPG`}
                                                    alt='Bundle Screenshot'
                                                />
                                                {/* TODO bilder weg vom rand */}
                                                <Stack>
                                                    <CardBody>
                                                        <Heading textTransform='capitalize' size='sm'>
                                                            {controller.formatRepositoryName(repository.name)}
                                                        </Heading>
                                                        <Text noOfLines={5} pt='2' fontSize='sm'>
                                                            {repository.description}
                                                        </Text>
                                                        <Stack spacing='4'>
                                                            <Box>
                                                                <Text pt='2' fontSize='sm'>
                                                                    Letztes Update vor {controller.getTimeDifferenceFromPush(repository.updated_at)} Tagen, {repository.open_issues_count} offene Issues
                                                                </Text>
                                                            </Box>
                                                        </Stack>
                                                    </CardBody>
                                                    <CardFooter>
                                                        <ButtonGroup>
                                                            <Button leftIcon={<MdOpenInNew />} variant='solid' onClick={() => window.open(`${repository.svn_url}`, '_blank')}>
                                                                Zur Detailseite
                                                            </Button>
                                                            {repository.homepage && (
                                                                <Button leftIcon={<MdOutlineExitToApp />} variant='solid' colorScheme='blue' onClick={() => window.open(`${repository.homepage}`, '_blank')}>
                                                                    Zur Demo
                                                                </Button>
                                                            )}
                                                        </ButtonGroup>
                                                    </CardFooter>
                                                </Stack>
                                            </Card>
                                        </div>
                                    ))}
                                </SimpleGrid>
                                <div ref={myRef}>Test</div>
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