import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import SandClock from "../assets/images/SandClock.png";
import Brush from "../assets/images/Brush.png";
import Ruler from "../assets/images/Ruler.png";

const ArtworkDetailsPage = () => {
  const { objectId } = useParams();
  const [artworkData, setArtworkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artistImage, setArtistImage] = useState();

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
        );
        setArtworkData(response.data);
        fetchArtistImage(response.data);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchArtistImage = async (artworkData) => {
      if (
        artworkData.artistDisplayName &&
        artworkData.artistDisplayName !== "Unknown"
      ) {
        try {
          const apiUrl = `https://api.artsy.net/api/search?q=${artworkData.artistDisplayName}&type=artist`;
          const response = await axios.get(apiUrl, {
            headers: {
              "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
            },
          });
          const results = response.data._embedded.results;

          if (results.length) {
            const selfUrl = results[0]._links.self.href;
            const response = await axios.get(selfUrl, {
              headers: {
                "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
              },
            });

            const firstLink = response.data._links.image.href;
            const image_version = response.data.image_versions[0];
            const finalLink = firstLink.replace(
              "{image_version}",
              image_version
            );
            setArtistImage(finalLink);
            console.log(artworkData);
          }
        } catch (error) {
          console.error("Error fetching image", error);
        }
      } else {
        console.error("Not picture available");
      }
    };

    fetchArtworkDetails();
  }, []);

  return (
    <Box>
      {loading ? (
        <Flex direction="column" align="center" justify="center">
          <Spinner />
          <Text>Loading artwork details...</Text>
        </Flex>
      ) : (
        <Box>
          <Text as="h3">Artwork Details</Text>
          {artworkData ? (
            <>
              <Image
                src={
                  artworkData.primaryImageSmall ||
                  "https://i0.wp.com/businessday.ng/wp-content/uploads/2022/02/art-work-1.jpg?fit=700%2C400&ssl=1"
                }
                alt={artworkData.title}
              />
              <Text as="h4">{artworkData.title}</Text>
              <Image src={artistImage} />
              <Text>{artworkData.artistDisplayName}</Text>
              <Text>About</Text>
              <Text>{artworkData.creditLine}</Text>
              <Text>Details</Text>
              <Flex align="center">
                <Image src={SandClock} alt="year" />
                <Text>{artworkData.objectDate}</Text>
              </Flex>
              <Flex align="center">
                <Image src={Brush} alt="medium" />
                <Text>{artworkData.medium}</Text>
              </Flex>
              <Flex align="center">
                <Image src={Ruler} alt="dimensions" />
                <Text>{artworkData.dimensions}</Text>
              </Flex>
            </>
          ) : (
            <Text>Unable to fetch artwork details.</Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ArtworkDetailsPage;
