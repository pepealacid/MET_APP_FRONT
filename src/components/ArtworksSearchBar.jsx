import { useState, useEffect } from "react";
import { Input, Box, Image, Text, Spinner, Button } from "@chakra-ui/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ArtworksSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { field } = useParams();

  const fetchSearchResults = async () => {
    setLoading(true);

    try {
      if (field !== "artworks") {
        console.error("Invalid field:", field);
        setLoading(false);
        return;
      }

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

      setSearchResults(objects);
      console.log(objects);
      console.log("QUERY", searchQuery);
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
    <Box position="relative">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder={`Search for the ${field}`}
          size="md"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <Button type="submit">Search</Button>
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
              <Link
                key={result.objectID}
                to={`/artworks/${result.objectID}`} // Set the route for each result
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
              </Link>
            ))}
          </>
        </Box>
      )}
    </Box>
  );
}
