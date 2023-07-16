import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

const WomenArtworks = () => {
  const womenArtworkIDs = [
    488014, 547713, 265820, 286121, 848077, 487806, 158999, 485803, 106018,
    169750, 87376, 854343, 656371, 431261, 485458, 267025, 294427, 170161,
    79878, 485454,
  ];

  const [womenArtworks, setWomenArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWomenArtworks();
  }, []);

  const fetchWomenArtworks = async () => {
    try {
      const randomArtworkIDs = getRandomArtworkIDs(womenArtworkIDs, 10);

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

  const getRandomArtworkIDs = (artworkIDs, count) => {
    const shuffledIDs = artworkIDs.sort(() => 0.5 - Math.random());
    return shuffledIDs.slice(0, count);
  };

  return (
    <div>
      <h3>
        <b>Women Artworks</b>
      </h3>
      {loading ? (
        <Spinner />
      ) : (
        womenArtworks.map((artwork) => (
          <div key={artwork.objectID}>
            <h4>{artwork.title}</h4>
            <p>Artist: {artwork.artistDisplayName}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default WomenArtworks;
