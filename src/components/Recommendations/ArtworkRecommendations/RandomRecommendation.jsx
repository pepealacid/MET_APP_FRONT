import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

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
        artworks.push(artwork);
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
      <h3>
        <b>Random Artworks</b>
      </h3>
      {loading ? (
        <Spinner />
      ) : (
        randomArtworks.map((artwork) => (
          <div key={artwork.objectID}>
            <h4>{artwork.title}</h4>
            <p>Artist: {artwork.artistDisplayName}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RandomArtworks;
