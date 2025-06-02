import { Box, Heading, Text } from '@chakra-ui/react';

interface MinimapProps {
  sortedRepos: { topic: string, repos: any[] }[];
  scrollToHeading: (topic: string) => void;
}

export const Minimap = ({ sortedRepos, scrollToHeading }: MinimapProps) => (
  <Box
    className="repo-overview--sidebar-container"
    position="fixed"
    top="120px"
    right="30px"
    zIndex={1200}
    minW="220px"
    maxW="250px"
    p={4}
    h="fit-content"
    bg="white"
    boxShadow="lg"
    borderRadius="md"
    border="1px solid #e2e8f0"
  >
    <Heading size="md" mb={4}>Themenübersicht</Heading>
    {sortedRepos && sortedRepos.length > 0 ? (
      sortedRepos.map((sortedRepo) => (
        <Text
          key={sortedRepo.topic}
          mb={2}
          cursor="pointer"
          _hover={{ color: '#005587', textDecoration: 'underline' }}
          onClick={() => scrollToHeading(sortedRepo.topic)}
        >
          {sortedRepo.topic}
        </Text>
      ))
    ) : (
      <Text color="gray.400">Keine Themen</Text>
    )}
  </Box>
);
