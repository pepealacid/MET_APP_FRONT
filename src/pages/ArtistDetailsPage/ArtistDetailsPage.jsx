import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Spinner, Text, Box, Image, Flex } from "@chakra-ui/react";
import RandomArtist from "../../assets/images/RandomArtist.png";
import GoBackButton from "../../assets/images/GoBackButton.png";
import { FavContext } from "../../context/fav.context";
import ArtistFavHeart from "../../assets/images/ArtistFavHeart.png";
import FavHeartFilled from "../../assets/images/FavHeartFilled.png";
import WhiteClock from "../../assets/images/WhiteClock.png";
import WhiteLocation from "../../assets/images/WhiteLocation.png";
import InfoButton from "../../assets/images/InfoButton.png";
import ShowMoreArrow from "../../assets/images/MoreArrow.png";
import ShowLessArrow from "../../assets/images/LessArrow.png";
import "./ArtistDetailsPage.css";

const ArtistDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("url");
  const [artistData, setArtistData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { favoriteArtistIds, addFavoriteArtist, removeFavoriteArtist } =
    useContext(FavContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(query, {
          headers: {
            "X-Xapp-Token": import.meta.env.VITE_ARTSY_TOKEN,
          },
        });
        setArtistData(response.data);
        console.log(artistData);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    const getImageUrl = () => {
      if (artistData && artistData._links.image) {
        const imageUrl = artistData._links.image.href;
        const imageVersion = artistData.image_versions[0];
        const url = imageUrl.replace("{image_version}", imageVersion);
        setImageUrl(url);
      }
    };

    getImageUrl();
  }, [artistData]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };


  const isArtistFavorited = () => {
    return favoriteArtistIds.includes(artistData.id);
  };

  const handleFavorite = () => {
    if (isArtistFavorited()) {
      removeFavoriteArtist(artistData.id);
    } else {
      addFavoriteArtist(artistData.id);
    }
  };

  return (
    <div>
      {artistData ? (
        <div className="artist-details-container">
          <div className="top-main">
            <Image
              className="main-image"
              src={imageUrl || RandomArtist}
              alt={artistData.name}
            />
            
            <button
              className={`fav-button ${isArtistFavorited() ? "favorited" : ""}`}
              onClick={handleFavorite}
            >
              {isArtistFavorited() ? (
                <img
                  className="fav-button-img"
                  src={FavHeartFilled}
                  alt="favorited"
                />
              ) : (
                <img
                  className="fav-button-img"
                  src={ArtistFavHeart}
                  alt="not-favorited"
                />
              )}
            </button>
          </div>
          <div className="top-info">
            <Text className="name" as="h4">
              {artistData.name}
            </Text>
            <div className="top-text">
              {artistData.birthday && artistData.birthday !== "" && (
                <>
                  <Image className="white-clock" src={WhiteClock} alt="date" />
                  <Text className="dates">
                    {artistData.birthday} - {artistData.deathday || "undefined"}
                  </Text>
                </>
              )}
              {((artistData.birthday &&
                artistData.birthday !== "" &&
                artistData.hometown) ||
                artistData.nationality) && <Text>|</Text>}
              {(artistData.hometown || artistData.nationality) && (
                <>
                  <Image src={WhiteLocation} alt="location" />
                  <Text>
                    {artistData.hometown
                      ? artistData.hometown
                      : artistData.nationality}
                  </Text>
                </>
              )}
            </div>
          </div>
          <div className="bottom-info">
            <div className="about-div">
              <Text className="about-header">About</Text>
              {artistData.biography ? (
                <>
                  <Text>
                    {showFullDescription
                      ? artistData.biography
                      : `${artistData.biography.slice(0, 100)}...`}
                    {artistData.biography.length > 100 && (
                      <div>
                        <br />
                        <span
                          className="read-more"
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={toggleDescription}
                        >
                          <p className="show-more-text">
                            {showFullDescription ? "Read less" : "Read more"}
                          </p>
                          <img
                            src={
                              showFullDescription
                                ? ShowLessArrow
                                : ShowMoreArrow
                            }
                          />
                        </span>
                      </div>
                    )}
                  </Text>
                  {artistData._links.permalink &&
                    artistData._links.permalink.href !== "" && (
                      <Box mt={20}>
                        <Text
                          className="more-info-header"
                          fontWeight="bold"
                          fontSize="20px"
                        >
                          Get more info
                        </Text>
                        <Link
                          to={artistData._links.permalink.href} // Access href property
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
                              >
                                Artsy
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
                              >
                                Visit {artistData._links.permalink.href}{" "}
                                {/* Access href property */}
                              </Text>
                            </Flex>
                            <Box className="button-side" padding={4}>
                              <img src={InfoButton} alt="go" />
                            </Box>
                          </Flex>
                        </Link>
                      </Box>
                    )}
                </>
              ) : (
                <Text>Not bio available</Text>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Spinner />
          <Text>Loading artist details...</Text>
        </div>
      )}
    </div>
  );
};

export default ArtistDetailsPage;
