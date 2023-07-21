import { useContext, useState } from "react";
import {
  Input,
  Box,
  Spinner,
  Center,
  InputGroup,
  InputLeftElement,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import Magnifier from "../assets/images/Magnifier.svg";
import { LanguageContext } from "../context/language.context";

export default function ArtworksSearchBar({ updateResults, setQuery }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const { t } = useContext(LanguageContext)

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setQuery(searchQuery);

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

  return t?.main && (
    <>
      <Box position="relative">
        <form onSubmit={handleSubmit}>
          <Box position="relative" marginTop="2rem" marginBottom="2rem">
            <Center>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Image
                    src={Magnifier}
                    alt="Search"
                    boxSize="25px"
                    marginLeft="46px"
                  />
                </InputLeftElement>
                <Input
                  placeholder={t?.main.searchArtwork || "Search for artworks"}
                  className="search-bar"
                  size="md"
                  w="90%"
                  onChange={handleChange}
                />
              </InputGroup>
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
