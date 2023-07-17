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

  //USING THE ARRAY - FASTER OPTION
  const fetchSpanishArtworks = async () => {
    try {
      const artworks = [];
      let count = 0;

      for (const objectID of spanishArtworksIDs) {
        if (count >= 10) break;

        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );

        const artwork = response.data;
        artworks.push(artwork);
        count++;
      }

      setSpanishArtworks(artworks);
    } catch (error) {
      console.error("Error fetching artwork details:", error);
    } finally {
      setLoading(false);
    }
  };

  //USING THE API - SLOWER OPTION
  // const fetchSpanishArtworks = async () => {
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
  //         artwork.artistNationality === "Spanish" &&
  //         (artwork.primaryImageSmall || artwork.primaryImage)
  //       ) {
  //         artworks.push(artwork);
  //         count++;
  //       }
  //     }

  //     setSpanishArtworks(artworks);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
