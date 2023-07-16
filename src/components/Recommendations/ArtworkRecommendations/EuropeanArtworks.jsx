import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

const EuropeanArtworks = () => {
  const [europeanArtworks, setEuropeanArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEuropeanArtworks();
  }, []);

  const fetchEuropeanArtworks = async () => {
    try {
      const apiUrl =
        "https://collectionapi.metmuseum.org/public/collection/v1/objects";
      const response = await axios.get(apiUrl);
      const objectIDs = response.data.objectIDs;

      const europeanNationalities = ["British", "French", "Italian", "Spanish", "English", "German"];
      const artworks = [];
      let count = 0;

      while (count < 10) {
        const randomIndex = Math.floor(Math.random() * objectIDs.length);
        const objectID = objectIDs[randomIndex];
        const detailsResponse = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );

        const artwork = detailsResponse.data;
        if (europeanNationalities.includes(artwork.artistNationality)) {
          artworks.push(artwork);
          count++;
        }
      }

      setEuropeanArtworks(artworks);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>
        <b>European Artworks</b>
      </h3>
      {loading ? (
        <Spinner />
      ) : (
        europeanArtworks.map((artwork) => (
          <div key={artwork.objectID}>
            <h4>{artwork.title}</h4>
            <p>Artist: {artwork.artistDisplayName}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EuropeanArtworks;
