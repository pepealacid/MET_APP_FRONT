import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spinner, Text } from "@chakra-ui/react";

const ArtworkDetailsPage = () => {

  const { objectId } = useParams();
  const [artworkData, setArtworkData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(objectId)


  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {

        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
        );
        setArtworkData(response.data);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworkDetails();
  }, [objectId]);

  return (
    <div>
      {loading ? (
        <>
          <Spinner />
          <p>Loading artwork details...</p>
        </>
      ) : (
        <div>
          <h3>Artwork Details</h3>
          {artworkData ? (
            <>
              <img
                src={artworkData.primaryImageSmall || "https://i0.wp.com/businessday.ng/wp-content/uploads/2022/02/art-work-1.jpg?fit=700%2C400&ssl=1"}
                alt={artworkData.title}
              />
              <h4>{artworkData.title}</h4>
              <Text>{artworkData.artistDisplayName}</Text>
              <Text>{artworkData.objectDate}</Text>
              <Text>{artworkData.medium}</Text>
              <Text>{artworkData.dimensions}</Text>
              <Text>{artworkData.creditLine}</Text>
            </>
          ) : (
            <p>Unable to fetch artwork details.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArtworkDetailsPage;
