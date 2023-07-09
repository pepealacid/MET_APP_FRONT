import { useState } from "react";
import { Input, Box, Spinner } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";

export default function ArtistsSearchBar({ updateResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const apiUrl = `https://api.artsy.net/api/search?q=${searchQuery}&type=artist`;
      const response = await axios.get(apiUrl, {
        headers: {
          "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
        },
      });
      const results = response.data._embedded.results;

      for (const result of results) {
        if (result._links.self.href) {
          const selfLink = result._links.self.href;
          result.imageUrl = await getImageUrl(selfLink);
          result.birthday = await getBirthday(selfLink);
          result.deathday = await getDeathday(selfLink);
          result.id = await getId(selfLink);
        }
      }

      updateResults(results); // Call the updateResults function with the updated results
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

  const getBirthday = async (result) => {
    try {
      const response = await axios.get(result, {
        headers: {
          "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
        },
      });
      if (response.data) {
        const birthday = response.data.birthday;
        return birthday;
      }
    } catch (error) {
      console.error("Error fetching birthday:", error);
    }
    return null;
  };

  const getDeathday = async (result) => {
    try {
      const response = await axios.get(result, {
        headers: {
          "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
        },
      });
      if (response.data) {
        const deathday = response.data.deathday;
        return deathday;
      }
    } catch (error) {
      console.error("Error fetching deathday:", error);
    }
    return null;
  };

  const getId = async (result) => {
    try {
      const response = await axios.get(result, {
        headers: {
          "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
        },
      });
      if (response.data) {
        const id = response.data.id;
        return id;
      }
    } catch (error) {
      console.error("Error fetching id:", error);
    }
    return null;
  };

  return (
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
            placeholder={`Search for artists`}
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
  );
}
