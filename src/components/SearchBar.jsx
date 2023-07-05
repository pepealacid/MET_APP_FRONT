import { useState, useEffect } from "react";
import { Input, Box, Image, Text, Spinner, Checkbox } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isHighlightChecked, setIsHighlightChecked] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const fetchSearchResults = async () => {
        setLoading(true);

        try {
          let apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchQuery}`;

          if (isHighlightChecked) {
            apiUrl += "&isHighlight=true";
          }

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
          setSearchResults(objects);
          console.log(objects);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }

        setLoading(false);
      };

      // Clear previous typing timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      // Set new typing timeout
      const newTypingTimeout = setTimeout(() => {
        fetchSearchResults();
      }, 2000);

      setTypingTimeout(newTypingTimeout);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, isHighlightChecked]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleHighlightChange = (event) => {
    const checked = event.target.checked;
    setIsHighlightChecked(checked);
  };

  const filterByArtist = (results) => {
    const artistResults = results.filter((result) =>
      result.artistDisplayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return artistResults.slice(0, 3);
  };

  const filterByArtworkTitle = (results) => {
    const artworkResults = results.filter((result) =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return artworkResults.slice(0, 3);
  };

  const filterByOthers = (results) => {
    const otherResults = results.filter(
      (result) =>
        !result.artistDisplayName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        !result.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return otherResults.slice(0, 3);
  };

  return (
    <Box position="relative">
      <Input
        placeholder="Search for an artist or artwork"
        size="md"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <Checkbox mt={2} onChange={handleHighlightChange}>
        Show only highlights
      </Checkbox>
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
          {filterByArtist(searchResults).length > 0 && (
            <>
              <Text fontWeight="bold">
                Works from "
                {searchQuery
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                "
              </Text>

              {filterByArtist(searchResults).map((result) => (
                <Link
                  key={result.objectID}
                  to={`/details/${result.objectID}`}
                  style={{ textDecoration: "none" }}
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
                </Link>
              ))}
            </>
          )}
          {filterByArtworkTitle(searchResults).length > 0 && (
            <>
              <Text fontWeight="bold">
                Artworks called "
                {searchQuery
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                ":
              </Text>
              {filterByArtworkTitle(searchResults).map((result) => (
                <Link
                  key={result.objectID}
                  to={`/details/${result.objectID}`}
                  style={{ textDecoration: "none" }}
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
                </Link>
              ))}
            </>
          )}
          {filterByOthers(searchResults).length > 0 && (
            <>
              <Text fontWeight="bold">Other results:</Text>
              {filterByOthers(searchResults).map((result) => (
                <Link
                  key={result.objectID}
                  to={`/details/${result.objectID}`}
                  style={{ textDecoration: "none" }}
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
                </Link>
              ))}
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
