import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Grid, GridItem, Text } from "@chakra-ui/react";
import ArtistCard from "../../ArtistCard/ArtistCard";
import { Link } from "react-router-dom";

const AmericanArtists = ({ favArtist, favoriteArtistIds, fetchFavorites }) => {
  const americanArtworksIDs = [
    34, 40, 41, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 119, 122, 123,
    130, 134, 203, 205, 215, 216, 218, 219, 220, 221, 223, 224, 225, 229, 230,
    231, 232, 233, 238, 246, 247, 248, 249, 261, 280, 285, 315, 316, 317, 318,
    322, 335, 336, 337, 339, 341, 342, 343, 344, 345, 346, 347, 348, 351, 354,
    363, 364, 376, 377, 378, 380, 381, 382, 383, 384, 386, 387, 388, 389, 394,
    395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
    415, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 434,
    435, 442, 443, 444, 458, 459, 463, 504, 505, 506, 2856, 2857, 2858, 2859,
    2860, 519, 521, 522, 532, 535, 534, 542, 544, 549, 552, 553, 554, 555, 564,
    565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579,
    580, 628, 630, 632, 681, 685, 757, 779, 780, 781, 783, 784, 786, 787, 788,
    789, 790, 793, 794, 798, 799, 801, 802, 803, 806, 807, 808, 810, 812, 813,
    822, 823, 824, 825, 826, 827, 878, 938, 939, 940, 944, 945, 953, 3337, 3338,
    3346, 3349, 3385, 3387, 3401,
  ];

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchAmericanArtists();
  }, []);

  const fetchAmericanArtists = async () => {
    try {
      const artists = [];

      while (artists.length < 10 && americanArtworksIDs.length > 0) {
        const randomIndex = Math.floor(Math.random() * americanArtworksIDs.length);
        const randomArtworkID = americanArtworksIDs[randomIndex];
        americanArtworksIDs.splice(randomIndex, 1); // Remove the used ID from the array

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
            if (selfInfo._links.image && selfInfo._links.image.href) { // Added verification for _links.image
              const firstLink = selfInfo._links.image.href;
              const image_version = selfInfo.image_versions[0];
              const finalLink = firstLink.replace("{image_version}", image_version);
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
      <Text className="recomm-header">American artists</Text>
      {loading ? (
        <Spinner />
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
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
      )}
    </div>
  );
};

export default AmericanArtists;
