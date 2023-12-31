import "./ArtworkDetailsPage.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Spinner,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import SandClock from "../../assets/images/SandClock.svg";
import Brush from "../../assets/images/Brush.svg";
import Ruler from "../../assets/images/Ruler.svg";
import WhiteClock from "../../assets/images/WhiteClock.svg";
import { FavContext } from "../../context/fav.context";
import FavHeart from "../../assets/images/FavHeart.svg";
import FavHeartFilled from "../../assets/images/FavHeartFilled.svg";
import RandomArtist from "../../assets/images/RandomArtist.png";
import InfoButton from "../../assets/images/InfoButton.svg";
import MuseumCard from "../../components/MuseumCard/MuseumCard";
import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";
import { LanguageContext } from "../../context/language.context";

const ArtworkDetailsPage = () => {
  const { objectId } = useParams();
  const [artworkData, setArtworkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artistImage, setArtistImage] = useState();
  const [relatedArtworks, setRelatedArtworks] = useState([]);
  const { favoriteArtworkIds, addFavoriteArtwork, removeFavoriteArtwork } =
    useContext(FavContext);

  const { t } = useContext(LanguageContext);

  useEffect(() => {
    fetchArtworkDetails();
    window.scrollTo(0, 0);
  }, [objectId]);

  const handleFavorite = () => {
    if (isArtworkFavorited()) {
      removeFavoriteArtwork(objectId);
    } else {
      addFavoriteArtwork(objectId);
    }
  };

  const isArtworkFavorited = () => {
    return favoriteArtworkIds.includes(objectId);
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
          const finalLink = firstLink.replace("{image_version}", image_version);
          setArtistImage(finalLink);
        }
      } catch (error) {
        console.error("Error fetching image", error);
      }
    } else {
      console.error("Not picture available");
    }
  };

  const fetchArtworkDetails = async () => {
    try {
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
      );
      setArtworkData(response.data);
      console.log(artworkData);
      fetchArtistImage(response.data);
      fetchRelatedArtworks(response.data);
    } catch (error) {
      console.error("Error fetching artwork details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArtworks = async (artworkData) => {
    try {
      const apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${artworkData.title}&isHighlight=true`;
      const response = await axios.get(apiUrl);
      const objectIDs = response.data.objectIDs;
      const promises = objectIDs.map((objectID) =>
        axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        )
      );
      const objectResponses = await Promise.all(promises);
      const objects = objectResponses.map(
        (objectResponse) => objectResponse.data
      );
      const filteredArtworks = objects.filter(
        (artwork) => artwork.objectID !== objectId
      );
      setRelatedArtworks(filteredArtworks);
    } catch (error) {
      console.error("Error fetching related artworks:", error);
    }
  };

  return (
    t?.artworkDetails && (
      <Box>
        {loading ? (
          <Flex direction="column" align="center" justify="center">
            <Spinner />
            <Text>
              {t?.artworkDetails.loading || "Loading artwork details..."}
            </Text>
          </Flex>
        ) : (
          <Box>
            <div className="artwork-details-container">
              {artworkData ? (
                <>
                  <div className="top-main">
                    <Image
                      className="main-image"
                      src={
                        artworkData.primaryImageSmall ||
                        "https://i0.wp.com/businessday.ng/wp-content/uploads/2022/02/art-work-1.jpg?fit=700%2C400&ssl=1"
                      }
                      alt={artworkData.title}
                    />

                    <button
                      className={`fav-button ${
                        isArtworkFavorited() ? "favorited" : ""
                      }`}
                      onClick={handleFavorite}
                    >
                      {isArtworkFavorited() ? (
                        <img
                          className="fav-button-img"
                          src={FavHeartFilled}
                          alt="favorited"
                        />
                      ) : (
                        <img
                          className="fav-button-img"
                          src={FavHeart}
                          alt="not-favorited"
                        />
                      )}
                    </button>
                    <div className="top-info">
                      <Text className="title" as="h4">
                        {artworkData.title}
                      </Text>
                      <div className="top-text">
                        <Image
                          className="white-clock"
                          src={WhiteClock}
                          alt="date"
                        />
                        <Text>{artworkData.objectDate}</Text>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-info">
                    <div className="artist-div">
                      <Image
                        className="artist-image"
                        src={artistImage || RandomArtist}
                      />
                      <Text className="artist-name">
                        {artworkData.artistDisplayName}
                      </Text>
                    </div>
                    <div className="about-div">
                      <Text className="about-header">
                        {t?.artworkDetails.about || "About"}
                      </Text>
                      <Text className="about-info">
                        {artworkData.creditLine}
                      </Text>
                    </div>
                    <div className="details-div">
                      <Text className="details-header">
                        {t?.artworkDetails.details || "Details"}
                      </Text>
                      <Flex align="center">
                        <Image src={SandClock} alt="year" />
                        <Text className="details-info">
                          {artworkData.objectDate}
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <Image src={Brush} alt="medium" />
                        <Text className="details-info">
                          {artworkData.medium}
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <Image src={Ruler} alt="dimensions" />
                        <Text className="details-info">
                          {artworkData.dimensions}
                        </Text>
                      </Flex>
                    </div>
                    {artworkData.objectWikidata_URL &&
                      artworkData.objectWikidata_URL !== "" && (
                        <Box mt={20}>
                          <Text
                            className="more-info-header"
                            fontWeight="bold"
                            fontSize="20px"
                          >
                            Get more info
                          </Text>
                          <Link
                            to={artworkData.objectWikidata_URL}
                            target="_blank"
                          >
                            <Flex
                              className="info-card"
                              backgroundColor="#f6f6f6"
                              borderRadius="10px"
                              display="inline-flex"
                              alignItems="center"
                              justifyContent="flex-start"
                            >
                              <Flex direction="column" flexGrow={1}>
                                <Text
                                  className="header"
                                  fontWeight="bold"
                                  padding={4}
                                  paddingBottom={0}
                                  color={"black"}
                                >
                                  Wikidata
                                </Text>
                                <Text
                                  className="link"
                                  padding={4}
                                  paddingTop={2}
                                  fontSize="12px"
                                  maxWidth="200px"
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                  whiteSpace="nowrap"
                                  color={"black"}
                                >
                                  Visit {artworkData.objectWikidata_URL}
                                </Text>
                              </Flex>
                              <Box className="button-side" padding={4}>
                                <img src={InfoButton} alt="go" />
                              </Box>
                            </Flex>
                          </Link>
                        </Box>
                      )}
                    <Box className="maps">
                      <Text className="map-header">
                        {t?.artworkDetails.find || "Where you'll find this"}
                      </Text>
                      <MuseumCard />
                    </Box>
                    {relatedArtworks.length > 0 && (
                      <div>
                        <Text className="related-header">
                          {t?.artworkDetails.like || "You might also like"}
                        </Text>
                        {relatedArtworks.length > 0 && (
                          <Box
                            position="relative"
                            mt={2}
                            overflowX="auto"
                            whiteSpace="nowrap"
                          >
                            <Table size="sm">
                              <Tbody>
                                <Tr>
                                  {relatedArtworks.map((artwork) => (
                                    <Td key={artwork.id} px={2}>
                                      <Link
                                        to={`/artwork/${artwork.objectID}`}
                                        style={{
                                          textDecoration: "none",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <ArtworkCard
                                          imageUrl={
                                            artwork.primaryImageSmall ||
                                            artwork.primaryImage
                                          }
                                          title={artwork.title}
                                          author={artwork.artistDisplayName}
                                          date={
                                            artwork.objectEndDate ||
                                            artwork.objectBeginDate
                                          }
                                          artworkID={artwork.objectID}
                                        />
                                      </Link>
                                    </Td>
                                  ))}
                                </Tr>
                              </Tbody>
                            </Table>
                          </Box>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Text>
                  {t?.artworkDetails.unable ||
                    "Unable to fetch artwork details."}
                </Text>
              )}
            </div>
          </Box>
        )}
      </Box>
    )
  );
};

export default ArtworkDetailsPage;
