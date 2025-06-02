import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button } from '@chakra-ui/react';
import { MdOpenInNew, MdOutlineExitToApp } from "react-icons/md";
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

interface NewsCardProps {
    release: any;
    controller: any;
}

export const NewsCard = ({ release, controller }: NewsCardProps) => (
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
                <Heading textTransform='capitalize' size="md">
                    {controller.formatRepositoryName(release.repoTitle)}: {release.name} ({controller.getDate(release.published_at)})
                </Heading>
                <Text>{parse(DOMPurify.sanitize(release?.body?.replace(/\n/g, '<br />')))}</Text>
            </CardBody>
            <CardFooter>
                <ButtonGroup>
                    <Button leftIcon={<MdOpenInNew />} as="a" href={release.html_url} target="_blank" rel="noopener noreferrer">
                        Zur Detailseite
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
);
