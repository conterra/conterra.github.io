import { Box, Heading, Text } from '@chakra-ui/react';

interface MinimapProps {
  sortedRepos: { topic: string, repos: any[] }[];
  scrollToHeading: (topic: string) => void;
  activeTopic?: string;
}

export const Minimap = ({ sortedRepos, scrollToHeading, activeTopic }: MinimapProps) => (
  <Box className="repo-overview--minimap-container">
    <Heading size="md" mb={4}>Themenübersicht</Heading>
    {sortedRepos && sortedRepos.length > 0 ? (
      sortedRepos.map((sortedRepo) => (
        <Text
          key={sortedRepo.topic}
          mb={2}
          cursor="pointer"
          _hover={{ color: '#005587', textDecoration: 'underline' }}
          onClick={() => scrollToHeading(sortedRepo.topic)}
          className={activeTopic === sortedRepo.topic ? 'minimap-active-topic' : ''}
        >
          {sortedRepo.topic}
        </Text>
      ))
    ) : (
      <Text color="gray.400">Keine Themen</Text>
    )}
  </Box>
);
