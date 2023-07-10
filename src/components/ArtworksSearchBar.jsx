import { useState, useEffect } from "react";
import { Input, Box, Image, Text, Spinner, Button } from "@chakra-ui/react";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";


export default function ArtworksSearchBar({ updateResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

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
        <Box position="relative">
          <SearchIcon
            position="absolute"
            left="0.75rem"
            top="50%"
            transform="translateY(-50%)"
            color="gray.300"
          />
          <Input
            placeholder={`Search for artworks`}
            size="md"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            pl="2.5rem" // Add padding to the left to accommodate the icon
          />
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
