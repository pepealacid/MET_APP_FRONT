import { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { Spinner, Text, Box, Image, Flex } from "@chakra-ui/react";
import RandomArtist from "../../assets/images/RandomArtist.png";
import { FavContext } from "../../context/fav.context";
import FavHeart from "../../assets/images/FavHeart.svg";
import FavHeartFilled from "../../assets/images/FavHeartFilled.svg";
import WhiteClock from "../../assets/images/WhiteClock.svg";
import WhiteLocation from "../../assets/images/WhiteLocation.svg";
import InfoButton from "../../assets/images/InfoButton.svg";
import ShowMoreArrow from "../../assets/images/MoreArrow.svg";
import ShowLessArrow from "../../assets/images/LessArrow.svg";
import "./ArtistDetailsPage.css";
import { LanguageContext } from "../../context/language.context";

const ArtistDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("url");
  const [artistData, setArtistData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { favoriteArtistIds, addFavoriteArtist, removeFavoriteArtist } =
    useContext(FavContext);

  const { t } = useContext(LanguageContext);

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
    t?.artistDetails && (
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
                className={`fav-button ${
                  isArtistFavorited() ? "favorited" : ""
                }`}
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
                    src={FavHeart}
                    alt="not-favorited"
                  />
                )}
              </button>
            </div>
            <div className="top-info" style={{position: "absolute", top: "130px", left: "20px"}}>
              <Text className="name" as="h4">
                {artistData.name}
              </Text>
              <div className="top-text">
                {artistData.birthday && artistData.birthday !== "" && (
                  <>
                    <Image
                      className="white-clock"
                      src={WhiteClock}
                      alt="date"
                    />
                    <Text className="dates">
                      {artistData.birthday} -{" "}
                      {artistData.deathday || "undefined"}
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
                <Text className="about-header">
                  {t?.artistDetails.about || "About"}
                </Text>
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
                            style={{ cursor: "pointer", color: "red", backgroundColor: "white", width: "120px"}}
                            onClick={toggleDescription}
                          >
                            <p className="show-more-text">
                              {showFullDescription
                                ? `${t?.artistDetails.less || "Read less"}`
                                : `${t?.artistDetails.more || "Read more"}`}
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
                            {t?.artistDetails.moreInfo || "Get more info"}
                          </Text>
                          <Link
                            to={artistData._links.permalink.href}
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
                                  color={"black"}
                                >
                                  {t?.artistDetails.visit || "Visit"}{" "}
                                  {artistData._links.permalink.href}{" "}
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
                  <Text>{t?.artistDetails.not || "Not bio available"}</Text>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Spinner />
            <Text>
              {t?.artistDetails.loading || "Loading artist details..."}
            </Text>
          </div>
        )}
      </div>
    )
  );
};

export default ArtistDetailsPage;
