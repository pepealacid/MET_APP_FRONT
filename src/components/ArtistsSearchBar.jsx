import { useState, useEffect } from "react";
import { Input, Box, Image, Text, Spinner, Button } from "@chakra-ui/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ArtistsSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { field } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      if (field !== "artists") {
        console.error("Invalid field:", field);
        setLoading(false);
        return;
      }

      const apiUrl = `https://api.artsy.net/api/search?q=${searchQuery}&type=artist`;
      const response = await axios.get(apiUrl, {
        headers: {
          "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
        },
      });
      const results = response.data._embedded.results;
      setSearchResults(results);

      for (const result of results) {
        const imageUrl = await getImageUrl(result);
        result.imageUrl = imageUrl;
        console.log(imageUrl)
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    setLoading(false);
  };

  const getImageUrl = async (result) => {
    try {
      if (result._links.image && result.image_versions && result.image_versions.length > 0) {
        const imageUrl = result._links.image.href.replace("{image_version}", result.image_versions[0]);
        const response = await axios.get(imageUrl, {
          headers: {
            "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
          },
        });
        return response.data._links.thumbnail.href;
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
    return null;
  };

  return (
    <Box position="relative">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder={`Search for ${field}`}
          size="md"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
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
                key={result.id}
                to={`/artist/${result.title}`}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  {result.imageUrl ? (
                    <Image
                      src={result.imageUrl}
                      alt={result.title}
                      boxSize="60px"
                      objectFit="cover"
                      marginRight={4}
                    />
                  ) : (
                    <Box
                      width="60px"
                      height="60px"
                      backgroundColor="gray.200"
                      borderRadius="md"
                      marginRight={4}
                    />
                  )}
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
