import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Grid, GridItem, Text } from "@chakra-ui/react";
import ArtistCard from "../../ArtistCard/ArtistCard";
import { Link } from "react-router-dom";

const SpanishArtists = ({ favArtist, favoriteArtistIds, fetchFavorites }) => {
  const spanishArtworksIDs = [
    263815, 369473, 333865, 656425, 336471, 724996, 479788, 491864, 493757,
    436926, 437742, 369468, 380635, 892369, 333963, 335316, 856581, 470878,
    345266, 369446,
  ];

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchSpanishArtists();
  }, []);

  const fetchSpanishArtists = async () => {
    try {
      const artists = [];

      while (artists.length < 10 && spanishArtworksIDs.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * spanishArtworksIDs.length
        );
        const randomArtworkID = spanishArtworksIDs[randomIndex];
        spanishArtworksIDs.splice(randomIndex, 1); // Remove the used ID from the array

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

  return (
    <div>
      <Text className="recomm-header">Spanish artists</Text>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ overflowX: "auto" }}>
          <Grid
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap={4}
            minWidth="100%"
          >
            {results.map((result, index) => (
              <GridItem key={index}>
                <ArtistCard
                  imageUrl={result.imageUrl || undefined}
                  title={result.name}
                  birthday={result.birthday}
                  deathday={result.deathday}
                  artistID={result.id}
                  favoriteArtistIds={favoriteArtistIds}
                  favArtist={favArtist}
                  fetchFavorites={fetchFavorites}
                />
              </GridItem>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default SpanishArtists;
