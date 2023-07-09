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
        if (result._links.self.href) {
          const selfLink = result._links.self.href;
          result.imageUrl = await getImageUrl(selfLink);
        }
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    setLoading(false);
  };

  const getImageUrl = async (result) => {
    try {
      const response = await axios.get(result, {
        headers: {
          "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
        },
      });
      if (response.data._links.image.href) {
        const firstLink = response.data._links.image.href;
        const image_version = response.data.image_versions[0];
        const finalLink = firstLink.replace("{image_version}", image_version);
        return finalLink;
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
                to={`/artist/${result.id}`} // Use the unique ID as the route parameter instead of the title
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Image
                    src={
                      result.imageUrl ||
                      "https://drawinghowtos.com/wp-content/uploads/2022/07/painter-colored.jpg"
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
