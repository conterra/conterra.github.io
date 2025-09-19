import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button, useTheme } from '@chakra-ui/react';
import { MdOpenInNew, MdOutlineExitToApp } from "react-icons/md";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

interface NewsCardProps {
    release: any;
    controller: any;
}

export const NewsCard = ({ release, controller }: NewsCardProps) => {
    const theme = useTheme();
    const isMajorRelease = /^v?\d+\.0\.0$/i.test(release.name);
    
    return (
        <Card
            direction='column'
            overflow='hidden'
            variant='outline'
            borderColor={isMajorRelease ? theme.colors.highlight : undefined}
            borderWidth={isMajorRelease ? '4px' : undefined}
            boxShadow={isMajorRelease ? 'lg' : undefined}
            display='flex'
            height='100%'
            mb={15}
        >
        <Image
            objectFit='cover'
            maxW='100%'
            src={`https://raw.githubusercontent.com/conterra/${release.repoTitle}/refs/heads/main/screenshot.png`}
            alt='Bundle Screenshot'
        />
        <Stack flex='1' justify='space-between'>
            <CardBody flex='1'>
                <Heading textTransform='capitalize' size="md" pb={3}>
                    {controller.formatRepositoryName(release.repoTitle)}: {release.name} ({controller.getDate(release.published_at)})
                </Heading>
                <ReactMarkdown 
                    remarkPlugins={[remarkBreaks, remarkGfm]}
                    components={{
                        p: ({ children }) => <Text mb={2}>{children}</Text>,
                        h1: ({ children }) => <Heading as="h1" size="lg" mb={2}>{children}</Heading>,
                        h2: ({ children }) => <Heading as="h2" size="md" mb={2}>{children}</Heading>,
                        h3: ({ children }) => <Heading as="h3" size="sm" mb={1}>{children}</Heading>,
                        ul: ({ children }) => <Text as="ul" pl={4} mb={2}>{children}</Text>,
                        ol: ({ children }) => <Text as="ol" pl={4} mb={2}>{children}</Text>,
                        li: ({ children }) => <Text as="li" mb={1}>{children}</Text>,
                        code: ({ children }) => <Text as="code" bg="gray.100" px={1} borderRadius="sm" fontFamily="mono">{children}</Text>,
                        pre: ({ children }) => <Text as="pre" bg="gray.100" p={3} borderRadius="md" overflow="auto" fontFamily="mono" mb={2}>{children}</Text>,
                    }}
                >
                    {release?.body || ''}
                </ReactMarkdown>
            </CardBody>
            <CardFooter mt='auto'>
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
};
