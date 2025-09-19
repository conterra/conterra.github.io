import { Box, Heading, Text, useTheme } from '@chakra-ui/react';

interface MinimapProps {
    sortedRepos: { topic: string, repos: any[] }[];
    scrollToHeading: (topic: string) => void;
    activeTopic?: string;
}

// Active link styles
const activeStyles = (isActive: boolean, theme: any) => isActive ? {
    background: '#e3f2fd',
    color: theme.colors.primaryBlue,
    fontWeight: 'bold',
    borderRadius: '4px',
    paddingLeft: '6px',
    paddingRight: '6px',
} : {};

export const Minimap = ({ sortedRepos, scrollToHeading, activeTopic }: MinimapProps) => {
    const theme = useTheme();

    return (
        <Box 
            position="relative"
            width="100%"
            p={2.5}
            height="fit-content"
            bg="white"
            borderRadius="0.375rem"
            border="1px solid #e2e8f0"
            ml={{ base: 0, lg: "auto" }}
            mr={{ base: 0, lg: 2.5 }}
            mb={{ base: 5, lg: 0 }}
            top={{ base: "auto", lg: "initial" }}
        >
            <Heading size="md" mb={4}>Themenübersicht</Heading>
            {sortedRepos && sortedRepos.length > 0 ? (
                sortedRepos.map((sortedRepo) => (
                    <Text
                        key={sortedRepo.topic}
                        mb={2}
                        cursor="pointer"
                        _hover={{ color: theme.colors.primaryBlue, textDecoration: 'underline' }}
                        onClick={() => scrollToHeading(sortedRepo.topic)}
                        sx={activeStyles(activeTopic === sortedRepo.topic, theme)}
                    >
                        {sortedRepo.topic}
                    </Text>
                ))
            ) : (
                <Text color="gray.400">Keine Themen</Text>
            )}
        </Box>
    )
};
