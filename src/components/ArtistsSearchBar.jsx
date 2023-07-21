import { useContext, useState } from "react";
import {
  Input,
  Box,
  Spinner,
  Center,
  Image,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import axios from "axios";
import "../main.css";
import Magnifier from "../assets/images/Magnifier.svg";
import { LanguageContext } from "../context/language.context";

export default function ArtistsSearchBar({ updateResults, setQuery }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const { t } = useContext(LanguageContext);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setQuery(e.target.value);
  };

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
      console.log(searchQuery);

      for (const result of results) {
        if (result._links.self.href) {
          const selfLink = result._links.self.href;
          result.imageUrl = await getImageUrl(selfLink);
          result.birthday = await getBirthday(selfLink);
          result.deathday = await getDeathday(selfLink);
          result.id = await getId(selfLink);
        }
      }

      updateResults(results);
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
        if (finalLink && finalLink !== "") {
          return finalLink;
        }
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
    return "https://drawinghowtos.com/wp-content/uploads/2022/07/painter-colored.jpg";
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
    t?.main && (
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
                  placeholder={t?.main.searchArtist || "Search for artists"}
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
    )
  );
}
