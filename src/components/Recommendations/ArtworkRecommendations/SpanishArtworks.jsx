import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Spinner, GridItem } from "@chakra-ui/react";
import ArtworkCard from "../../ArtworkCard/ArtworkCard";
import { Link } from "react-router-dom";

const SpanishArtworks = () => {
  const spanishArtworksIDs = [
    263815, 369473, 333865, 656425, 336471, 724996, 479788, 491864, 493757,
    436926, 437742, 369468, 380635, 892369, 333963, 335316, 856581, 470878,
    345266, 369446,
  ];
  const [spanishArtworks, setSpanishArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpanishArtworks();
  }, []);

  const fetchSpanishArtworks = async () => {
    try {
      const randomArtworkIDs = getRandomArtworkIDs(spanishArtworksIDs, 10);

      const artworks = [];
      for (const objectID of randomArtworkIDs) {
        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );

        const artwork = response.data;
        artworks.push(artwork);
      }

      setSpanishArtworks(artworks);
    } catch (error) {
      console.error("Error fetching artwork details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomArtworkIDs = (artworkIDs, count) => {
    const shuffledIDs = artworkIDs.sort(() => 0.5 - Math.random());
    return shuffledIDs.slice(0, count);
  };
  return (
    <div>
      <h3>
        <b>Spanish Artworks</b>
      </h3>
      {loading ? (
        <Spinner />
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {spanishArtworks.map(
            (artwork) =>
              artwork.id !== null && (
                <GridItem key={artwork.id}>
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
                      date={artwork.objectEndDate || artwork.objectBeginDate}
                      artworkID={artwork.objectID}
                       favoriteArtworkIds={favoriteArtworkIds}
                      favArtwork={favArtwork}
                      fetchFavorites={fetchFavorites}
                    />
                  </Link>
                </GridItem>
              )
          )}
        </Grid>
      )}
    </div>
  );
};

export default SpanishArtworks;
