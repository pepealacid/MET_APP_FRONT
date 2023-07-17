import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Table, Tbody, Tr, Td, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ArtworkCard from "../../ArtworkCard/ArtworkCard";

const EuropeanArtworks = () => {
  const [europeanArtworks, setEuropeanArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const europeanArtworksIDs = [
    37, 38, 227, 265, 266, 461, 471, 477, 479, 480, 488, 489, 490, 491, 492,
    494, 512, 644, 645, 646, 941, 942, 1012, 1080, 1081, 1082, 1084, 1309, 1310,
    1355, 1773, 1774, 1775, 1776, 1834, 1835, 1836, 1837, 1872, 1873, 1874,
    1875, 1876, 1877, 2096, 2144, 2145, 2209, 4466, 2679, 2847, 2849, 4943,
    4949, 4950, 4951, 4952, 4953, 4954, 4966, 5025, 5026, 5028, 5031, 5032,
    5033, 5034, 5035, 5036, 5037, 5038, 5039, 5040, 5041, 5042, 5043, 5044,
    2962, 3162, 3163, 3315, 3316, 3317, 3318, 3319,
  ];

  useEffect(() => {
    fetchEuropeanArtworks();
  }, []);

  //USING THE PRESAVED ARRAY - FASTER OPTION
  const fetchEuropeanArtworks = async () => {
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

      setEuropeanArtworks(artworks);
    } catch (error) {
      console.error("Error fetching artwork details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomArtworkIDs = (count) => {
    const randomArtworkIDs = [];

    while (randomArtworkIDs.length < count) {
      const randomIndex = Math.floor(
        Math.random() * europeanArtworksIDs.length
      );
      const randomArtworkID = europeanArtworksIDs[randomIndex];

      if (!randomArtworkIDs.includes(randomArtworkID)) {
        randomArtworkIDs.push(randomArtworkID);
      }
    }

    return randomArtworkIDs;
  };

  //USING THE API - SLOWER OPTION
  // const fetchEuropeanArtworks = async () => {
  //   try {
  //     const apiUrl =
  //       "https://collectionapi.metmuseum.org/public/collection/v1/objects";
  //     const response = await axios.get(apiUrl);
  //     const objectIDs = response.data.objectIDs;

  // const europeanNationalities = [
  //   "British",
  //   "French",
  //   "Italian",
  //   "Spanish",
  //   "English",
  //   "German",
  //   "Scottish",
  //   "Irish",
  //   "Swedish",
  //   "Norwegian",
  //   "Danish",
  //   "Finnish",
  //   "Dutch",
  //   "Portuguese",
  //   "Greek",
  //   "Polish",
  //   "Russian",
  //   "Ukrainian",
  //   "Belgian",
  //   "Austrian",
  //   "Swiss",
  //   "Czech",
  //   "Hungarian",
  //   "Romanian",
  //   "Bulgarian",
  //   "Turkish",
  //   "Croatian",
  //   "Serbian",
  //   "Slovak",
  //   "Slovenian",
  //   "Estonian",
  //   "Latvian",
  //   "Lithuanian",
  //   "Icelandic",
  //   "Moldovan",
  //   "Luxembourgish",
  //   "Maltese",
  //   "Albanian",
  //   "Macedonian",
  //   "Bosnian",
  //   "Montenegrin",
  //   "Belarusian",
  //   "Andorran",
  //   "Monégasque",
  //   "Liechtensteiner",
  //   "Vatican",
  // ];

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
  //         europeanNationalities.includes(artwork.artistNationality) &&
  //         (artwork.primaryImageSmall || artwork.primaryImage)
  //       ) {
  //         artworks.push(artwork);
  //         count++;
  //       }
  //     }

  //     setEuropeanArtworks(artworks);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <Text className="recomm-header">European artworks</Text>
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
                {europeanArtworks
                  .slice(0, Math.ceil(europeanArtworks.length / 2))
                  .map((artwork) => (
                    <Td key={artwork.id} px={2}>
                      <Link
                        to={`/artwork/${artwork.objectID}`}
                        style={{ textDecoration: "none", cursor: "pointer" }}
                      >
                        <ArtworkCard
                          imageUrl={
                            artwork.primaryImageSmall || artwork.primaryImage
                          }
                          title={artwork.title}
                          author={artwork.artistDisplayName}
                          date={
                            artwork.objectEndDate || artwork.objectBeginDate
                          }
                          artworkID={artwork.objectID}
                        />
                      </Link>
                    </Td>
                  ))}
              </Tr>
              <Tr>
                {europeanArtworks
                  .slice(Math.ceil(europeanArtworks.length / 2))
                  .map((artwork) => (
                    <Td key={artwork.id} px={2}>
                      <Link
                        to={`/artwork/${artwork.objectID}`}
                        style={{ textDecoration: "none", cursor: "pointer" }}
                      >
                        <ArtworkCard
                          imageUrl={
                            artwork.primaryImageSmall || artwork.primaryImage
                          }
                          title={artwork.title}
                          author={artwork.artistDisplayName}
                          date={
                            artwork.objectEndDate || artwork.objectBeginDate
                          }
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

export default EuropeanArtworks;
