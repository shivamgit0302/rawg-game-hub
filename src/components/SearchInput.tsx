import React, { useRef } from "react";
import { InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

export interface Props {
  onSearch: (searchValue: string | "") => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box width={"100%"}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (inputRef.current) onSearch(inputRef.current.value);
        }}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BsSearch />}
          ></InputLeftElement>
          <Input
            ref={inputRef}
            type="tel"
            placeholder="Search games..."
            variant="filled"
            borderRadius={20}
          />
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchInput;
