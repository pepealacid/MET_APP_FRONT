import { useContext, useEffect, useState } from "react";
import "./TourSearchCard.css";
import FavHeartFilled from "../../../../assets/images/FavHeartFilled.svg";
import SmallWallClock from "../../../../assets/images/SmallWallClock.svg";
import Gallery from "../../../../assets/images/Gallery.svg";
import FavHeart from "../../../../assets/images/FavHeart.svg";
import { convertToHoursAndMinutes } from "../../../../utils/functions";
import { AuthContext } from "../../../../context/auth.context";
import itineraryService from "../../../../services/itinerary.service";
import { Image, Text } from "@chakra-ui/react";
import { LanguageContext } from "../../../../context/language.context";

const TourSearchCard = ({ data }) => {
  const { user } = useContext(AuthContext);
  const [favorite, setFavorite] = useState(false);
  const [tourData, setTourData] = useState([]);

  const { t } = useContext(LanguageContext);

  useEffect(() => {
    setTourData(data);
    decideSavedStatus();
  }, []);

  const truncatedTitle =
    data.name && data.name.length > 18
      ? `${data.name.substring(0, 18)}...`
      : data.name;
  const time = convertToHoursAndMinutes(data.calculatedTime);
  const id = data._id;

  const decideSavedStatus = async () => {
    const tours = await getSavedTours();
    const boolean = !tours.every((tour) => tour._id !== id);
    setFavorite(boolean);
  };

  const removeSaved = async () => {
    const userId = user.data?._id;
    try {
      await itineraryService.removeItinerary(userId, { itineraryId: id });
      decideSavedStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const addToSaved = async () => {
    const userId = user.data?._id;
    try {
      await itineraryService.addItinerary(userId, { itineraryId: id });
      decideSavedStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const getSavedTours = async () => {
    const userId = user.data?._id;
    let savedTours = await itineraryService.getUserItineraries(userId);
    savedTours = savedTours.data;
    return savedTours;
  };

  const handleFavClick = (event) => {
    event.preventDefault();
    favorite ? removeSaved() : addToSaved();
  };

  return (
    t?.tours && (
      <div className="artwork-card">
        <div className="top">
          <div className="img-container">
            <img className="main-img" src={data.picture} alt="artwork" />
            <button className="fav-button" onClick={handleFavClick}>
              {
                // favoriteArtworkIds.includes(artworkID.toString())

                favorite ? (
                  <img
                    className="fav-button-img"
                    src={FavHeartFilled}
                    alt="favorite"
                  />
                ) : (
                  <img
                    className="fav-button-img"
                    src={FavHeart}
                    alt="not-favorite"
                  />
                )
              }
            </button>
          </div>
        </div>
        <div className="foot">
          <h3 className="title">{truncatedTitle}</h3>
          <Text pt="10px">{t?.tours.discover || "Discover art"}</Text>
          <div className="date">
            <Image className="clock" src={SmallWallClock} p="2px" />
            <Text ml="6px" mr="6px" pt="4px">
              {time}
            </Text>
            <Text ml="6px" mr="6px">
              {" | "}
            </Text>
            <Image className="clock" src={Gallery} p="2px" />
            <Text ml="6px" mr="6px" pt="4px">
              {data.artworkData?.length}
            </Text>
          </div>
        </div>
      </div>
    )
  );
};
export default TourSearchCard;
