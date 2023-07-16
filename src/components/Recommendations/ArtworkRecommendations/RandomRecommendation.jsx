import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Grid, GridItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ArtworkCard from "../../ArtworkCard/ArtworkCard";

const RandomArtworks = ({
  n,
  favArtwork,
  favoriteArtworkIds,
  fetchFavorites,
}) => {
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
        if (artwork.id !== null && (artwork.primaryImageSmall || artwork.primaryImage)) {
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
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {randomArtworks
            .filter(
              (artwork) => artwork.id !== null && (artwork.primaryImageSmall || artwork.primaryImage)
            )
            .map((artwork) => (
              <GridItem key={artwork.id}>
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
                    favoriteArtworkIds={favoriteArtworkIds}
                    favArtwork={favArtwork}
                    fetchFavorites={fetchFavorites}
                  />
                </Link>
              </GridItem>
            ))}
        </Grid>
      )}
    </div>
  );
};

export default RandomArtworks;
