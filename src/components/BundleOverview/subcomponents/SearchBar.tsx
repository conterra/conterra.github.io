import { Flex, InputGroup, InputLeftElement, Input, InputRightElement, IconButton } from '@chakra-ui/react';
import { MdSearch, MdClose } from 'react-icons/md';

interface SearchBarProps {
  searchItem: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ searchItem, handleInputChange }: SearchBarProps) => (
  <div className="repo-overview--search-bar-container">
    <Flex className="repo-overview--search-bar-flex">
      <InputGroup className="repo-overview--search-bar-input">
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
        {searchItem && (
          <InputRightElement>
            <IconButton
              aria-label="Clear search"
              icon={<MdClose />}
              size="sm"
              variant="ghost"
              onClick={() => handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
              tabIndex={-1}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Flex>
  </div>
);
