import { useState, useEffect } from "react";
import { Input, Box, Image, Text, Spinner, Button } from "@chakra-ui/react";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";

export default function ArtworksLiveSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { field } = useParams();

  const fetchSearchResults = async () => {
    setLoading(true);

    try {
      let apiUrl;
      if (field === "artists") {
        apiUrl = `https://api.artsy.net/api/search?q=${searchQuery}&type=artist`;
        console.log(searchQuery, "ESTA ES LA QUERY");
      } else if (field === "artworks") {
        apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchQuery}&isHighlight=true`;
      } else {
        console.error("Invalid field:", field);
        setLoading(false);
        return;
      }
      let response;
      if (field === "artists") {
        response = await axios.get(apiUrl, {
          headers: {
            "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
          },
        });
        const results = response.data._embedded.results;
        console.log("HOLA QUÉ TAL ---------", results);
      } else if (field === "artworks") {
        response = await axios.get(apiUrl);
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

        setSearchResults(objects);
        console.log(objects);
        console.log("QUERY", searchQuery);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    setLoading(false);
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSearchResults();
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

        {searchQuery.trim() !== "" && !loading && searchResults.length > 0 && (
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
            <>
              {searchResults.map((result) => (
                <a
                  key={result.objectID}
                  // onClick={() => handleArtworkPush(result.objectID)} // Attach onClick event handler here
                  style={{ textDecoration: "none", cursor: "pointer" }} // Set cursor style to indicate clickable element
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Image
                      src={
                        result.primaryImageSmall ||
                        "https://easydrawingguides.com/wp-content/uploads/2021/01/Museum-Step-10.png"
                      }
                      alt={result.title}
                      boxSize="60px"
                      objectFit="cover"
                      marginRight={4}
                    />
                    <Text>{result.title}</Text>
                  </Box>
                </a>
              ))}
            </>
          </Box>
        )}
      </Box>
    </>
  );
}
