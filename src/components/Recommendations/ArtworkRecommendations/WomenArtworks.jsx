import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Spinner, Table, Tbody, Tr, Td, Text, Box } from "@chakra-ui/react";
import ArtworkCard from "../../ArtworkCard/ArtworkCard";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/language.context";

const WomenArtworks = () => {
  const womenArtworkIDs = [
    13384, 4267, 10344, 10345, 10731, 10838, 10868, 11271, 11272, 11876, 10088,
    12594, 12645, 13747, 13752, 13753, 13756, 11554, 12655, 12656, 12657, 14087,
    10956, 10957, 10958, 11156, 11157, 13587, 13597, 13598, 13599, 13849, 13854,
    13869, 13875, 11698, 11699, 13604, 13605, 14091, 14092, 14093, 14094, 14096,
    14099, 13606, 13607, 13611, 13612, 14101, 13620, 13624, 13626, 13629, 13674,
    13712, 13725, 13743, 13169, 13348, 14128, 14130, 14131, 14138, 14139, 14199,
    14312, 14317,
  ];

  const [womenArtworks, setWomenArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useContext(LanguageContext);

  useEffect(() => {
    fetchWomenArtworks();
  }, []);

  //USING THE ARRAY - FASTER OPTION

  const fetchWomenArtworks = async () => {
    try {
      const randomArtworkIDs = getRandomArtworkIDs(10);
      const artworks = [];

      for (const objectID of randomArtworkIDs) {
        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );

        const artwork = response.data;
        artworks.push(artwork);
      }

      setWomenArtworks(artworks);
    } catch (error) {
      console.error("Error fetching artwork details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomArtworkIDs = (count) => {
    const randomArtworkIDs = [];

    while (randomArtworkIDs.length < count) {
      const randomIndex = Math.floor(Math.random() * womenArtworkIDs.length);
      const randomArtworkID = womenArtworkIDs[randomIndex];

      if (!randomArtworkIDs.includes(randomArtworkID)) {
        randomArtworkIDs.push(randomArtworkID);
      }
    }

    return randomArtworkIDs;
  };

  //USING THE API - SLOWER OPTION

  // const fetchWomenArtworks = async () => {
  //   try {
  //     const apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
  //     const response = await axios.get(apiUrl);
  //     const objectIDs = response.data.objectIDs;

  //     const artworks = [];
  //     let count = 0;

  //     while (count < 10) {
  //       const randomIndex = Math.floor(Math.random() * objectIDs.length);
  //       const objectID = objectIDs[randomIndex];
  //       const detailsResponse = await axios.get(
  //         `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  //       );

  //       const artwork = detailsResponse.data;
  //       if (
  //         artwork.artistGender === "Female" &&
  //         (artwork.primaryImageSmall || artwork.primaryImage)
  //       ) {
  //         artworks.push(artwork);
  //         count++;
  //       }
  //     }

  //     setFemaleArtworks(artworks);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <Text className="recomm-header">{t?.artworkSearchPage.women}</Text>
      {loading ? (
        <Spinner />
      ) : (
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
                {womenArtworks.map((artwork) => (
                  <Td key={artwork.id} px={2}>
                    <Link
                      to={`/artwork/${artwork.objectID}`}
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      <ArtworkCard

                        context="recommendation"
                        imageUrl={
                          artwork.primaryImageSmall || artwork.primaryImage
                        }
                        title={artwork.title}
                        author={artwork.artistDisplayName}
                        date={artwork.objectEndDate || artwork.objectBeginDate}
                        artworkID={artwork.objectID}
                      />
                    </Link>
                  </Td>
                ))}
              </Tr>
            </Tbody>
          </Table>
        </Box>
      )}
    </div>
  );
};

export default WomenArtworks;
