import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button, Box } from '@chakra-ui/react';
import { MdOpenInNew, MdOutlineExitToApp } from "react-icons/md";

interface OverviewCardProps {
    repository: any;
    controller: any;
}

export const OverviewCard = ({ repository, controller }: OverviewCardProps) => (
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
);
