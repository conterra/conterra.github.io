import { Flex, InputGroup, InputLeftElement, Input, InputRightElement, IconButton, Box } from '@chakra-ui/react';
import { MdSearch, MdClose } from 'react-icons/md';

interface SearchBarProps {
  searchItem: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ searchItem, handleInputChange }: SearchBarProps) => (
  <Box>
    <Flex pr={{ base: 0, lg: 0 }}>
      <InputGroup width="100%">
        <InputLeftElement pointerEvents='none'>
          <MdSearch />
        </InputLeftElement>
        <Input
          type="text"
          backgroundColor="white"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Developer Network Bundles durchsuchen"
          mb={2.5}
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
  </Box>
);
