import { useState } from "react";
import { Input, Box, Spinner, Center } from "@chakra-ui/react";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";

export default function ArtworksSearchBar({ updateResults, setQuery }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setQuery(searchQuery)

    try {
      const apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchQuery}&isHighlight=true`;
      const response = await axios.get(apiUrl);
      const objectIDs = response.data.objectIDs;
      const promises = objectIDs.map((objectID) =>
        axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        )
      );
      const objectResponses = await Promise.all(promises);
      const objects = objectResponses.map(
        (objectResponse) => objectResponse.data
      );

      updateResults(objects);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <Box position="relative">
        <form onSubmit={handleSubmit}>
          <Box position="relative" marginTop="2rem" marginBottom="2rem">
            <SearchIcon
              position="absolute"
              left="2.2rem"
              top="50%"
              transform="translateY(-50%)"
              color="gray.300"
            />
            <Center>
              <Input
                placeholder="       Search for artworks"
                className="search-bar"
                size="md"
                w="90%"
                onChange={handleChange}
              />
            </Center>
          </Box>
        </form>

        {loading && (
          <Box
            position="absolute"
            zIndex={10}
            top="100%"
            left={0}
            right={0}
            backgroundColor="white"
            boxShadow="md"
            borderRadius="md"
            p={4}
            mt={2}
            maxHeight="300px"
            overflowY="auto"
          >
            <Spinner size="sm" color="gray.500" mr={2} />
          </Box>
        )}
      </Box>
    </>
  );
}
