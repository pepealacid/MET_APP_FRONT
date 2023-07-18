import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Spinner, Table, Tbody, Tr, Td, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ArtworkCard from "../../ArtworkCard/ArtworkCard";

const RandomArtworks = ({ n }) => {


  const [randomArtworks, setRandomArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomArtworks();
  }, []);

  const fetchRandomArtworks = async () => {
    try {
      const apiUrl =
        "https://collectionapi.metmuseum.org/public/collection/v1/objects";
      const response = await axios.get(apiUrl);
      const objectIDs = response.data.objectIDs;

      const randomArtworkIDs = getRandomArtworkIDs(objectIDs, n);
      const artworks = [];

      for (const objectID of randomArtworkIDs) {
        const detailsResponse = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );

        const artwork = detailsResponse.data;
        if (
          artwork.id !== null &&
          (artwork.primaryImageSmall || artwork.primaryImage)
        ) {
          artworks.push(artwork);
        }
      }

      setRandomArtworks(artworks);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomArtworkIDs = (artworkIDs, count) => {
    const shuffledIDs = shuffleArray(artworkIDs);
    return shuffledIDs.slice(0, count);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div>
      <Text className="recomm-header">Random artworks</Text>
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
      {randomArtworks.map((artwork) => (
        <Td key={artwork.id} px={2}>
          <Link
            to={`/artwork/${artwork.objectID}`}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <ArtworkCard
              imageUrl={artwork.primaryImageSmall || artwork.primaryImage}
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

export default RandomArtworks;
