import { Flex, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

interface SearchBarProps {
  searchItem: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ searchItem, handleInputChange }: SearchBarProps) => (
  <div className="repo-overview--search-bar-container">
    <Flex className="repo-overview--search-bar-flex">
      <InputGroup className="repo-overview--search-bar-input" position={"fixed"} zIndex={1000}>
        <InputLeftElement pointerEvents='none'>
          <MdSearch />
        </InputLeftElement>
        <Input
          type="text"
          backgroundColor="white"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Developer Network Bundles durchsuchen"
        />
      </InputGroup>
    </Flex>
  </div>
);
