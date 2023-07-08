import { useState } from "react";
import { Input, Box, Image, Text, Spinner, Button } from "@chakra-ui/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ArtistsSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { field } = useParams();

  const fetchSearchResults = async () => {
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
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    setLoading(false);
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
                to={{
                  pathname: `/artist/${result.title}`,
                  search: `?url=${encodeURIComponent(result._links.self.href)}`,
                }}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Image
                    src={
                      "https://img.freepik.com/vector-gratis/ilustracion-dibujos-animados-pintor-artista-masculino-concepto-icono-profesion-personas_138676-1900.jpg?w=740&t=st=1688813016~exp=1688813616~hmac=aad12db3a987fccb96116f1c63696210876e8e6efd6ec4a0a98d4939d58f71f4"
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
