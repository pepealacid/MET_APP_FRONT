import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Table, Tr, Td, Text, Box, Tbody } from "@chakra-ui/react";
import ArtistCard from "../../ArtistCard/ArtistCard";
import { Link } from "react-router-dom";

const WomenArtists = () => {
  const womenArtworkIDs = [
    13384, 4267, 10344, 10345, 10731, 10838, 10868, 11271, 11272, 11876, 10088,
    12594, 12645, 13747, 13752, 13753, 13756, 11554, 12655, 12656, 12657, 14087,
    10956, 10957, 10958, 11156, 11157, 13587, 13597, 13598, 13599, 13849, 13854,
    13869, 13875, 11698, 11699, 13604, 13605, 14091, 14092, 14093, 14094, 14096,
    14099, 13606, 13607, 13611, 13612, 14101, 13620, 13624, 13626, 13629, 13674,
    13712, 13725, 13743, 13169, 13348, 14128, 14130, 14131, 14138, 14139, 14199,
    14312, 14317,
  ];

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchWomenArtists();
  }, []);

  const fetchWomenArtists = async () => {
    try {
      const artists = [];

      while (artists.length < 10 && womenArtworkIDs.length > 0) {
        const randomIndex = Math.floor(Math.random() * womenArtworkIDs.length);
        const randomArtworkID = womenArtworkIDs[randomIndex];
        womenArtworkIDs.splice(randomIndex, 1); // Remove the used ID from the array

        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomArtworkID}`
        );

        if (
          response.data.artistDisplayName &&
          response.data.artistDisplayName !== ""
        ) {
          const artist = response.data.artistDisplayName;
          const result = await axios.get(
            `https://api.artsy.net/api/search?q=${artist}&type=artist`,
            {
              headers: {
                "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
              },
            }
          );
          const artistInfo = result.data._embedded.results;

          if (artistInfo.length > 0) {
            const selfLink = artistInfo[0]._links.self.href;
            const selfResponse = await axios.get(selfLink, {
              headers: {
                "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
              },
            });
            const selfInfo = selfResponse.data;
            if (selfInfo._links.image && selfInfo._links.image.href) {
              // Added verification for _links.image
              const firstLink = selfInfo._links.image.href;
              const image_version = selfInfo.image_versions[0];
              const finalLink = firstLink.replace(
                "{image_version}",
                image_version
              );
              selfInfo.imageUrl = finalLink;

              if (!artists.some((artist) => artist.name === selfInfo.name)) {
                artists.push(selfInfo);
              }
            }
          }
        }
      }

      setResults(artists);
    } catch (error) {
      console.error("Error fetching artwork details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Text className="recomm-header">Women in Art</Text>
        <Spinner />
      </>
    );
  }

  return (
    <div>
      <Text className="recomm-header">Women in Art</Text>
      <Box
        position="relative"
        mt={2}
        overflowX="auto"
        maxHeight="600px"
        whiteSpace="nowrap"
      >
        <Table size="sm">
          <Tbody>
            <Tr>
              {results.map((result, index) => (
                <Td key={index} px={2} width={`${100 / results.length}%`}>
                  <Link
                    to={{
                      pathname: `/artist/${result.title}`,
                      search: `?url=${encodeURIComponent(
                        result._links.self.href
                      )}`,
                    }}
                    style={{ textDecoration: "none", cursor: "pointer" }}
                  >
                    <ArtistCard
                      imageUrl={result.imageUrl || undefined}
                      title={result.name}
                      birthday={result.birthday}
                      deathday={result.deathday}
                      artistID={result.id}
                    />
                  </Link>
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default WomenArtists;
