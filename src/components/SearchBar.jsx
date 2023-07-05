import { useState } from "react";
import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`
      );
      setSearchResults(response.data.objectIDs);
      console.log(query, searchResults)
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Input
          placeholder="Busca un artista u obra"
          size="md"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Search Results</PopoverHeader>
        <PopoverBody>
          <VStack spacing={2}>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div key={result.objectID}>{result.title}</div>
              ))
            ) : (
              <div>No results found</div>
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
