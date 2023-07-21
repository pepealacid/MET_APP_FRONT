import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import itineraryService from "../../services/itinerary.service";
import PieceCard from "../../components/Itinerary/suggestedTour/PieceCard";
import { convertToHoursAndMinutes } from "../../utils/functions";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import TimeWhite from "../../assets/images/TimeWhite.svg";
import paint from "../../assets/images/paint.svg";
import FavHeart from "../../assets/images/FavHeart.svg";
import FavHeartFilled from "../../assets/images/FavHeartFilled.svg";
import { LanguageContext } from "../../context/language.context";

function ItineraryPage() {
  const metPicture =
    "https://sothebys-com.brightspotcdn.com/dims4/default/ad7ae47/2147483647/strip/true/crop/3493x1976+0+315/resize/1156x654!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys.brightspotcdn.com%2F1d%2F6e%2F7f23844d45d5b6aef37d9d7b8e50%2F5.%20New%20European%20Paintings%20Galleries_Gallery%20601_Italian%20Baroque_MMA.jpg";
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { t } = useContext(LanguageContext);

  const [tourData, setTourData] = useState([]);
  const [time, setTime] = useState([]);
  const [favorite, setFavorite] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    getTour(id);
  }, [user]);

  const getTour = async (id) => {
    const res = await itineraryService.getItineraryById(id);
    setTourData(res.data);
    setTime(convertToHoursAndMinutes(res.data.calculatedTime));
    decideSavedStatus();
  };

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

  const handleSaving = () => {
    favorite ? removeSaved() : addToSaved();
  };

  const startTour = () => {
    navigate(`/tour/${id}`);
  };

  return (
    t?.tours && (
      <>
        <Box
          bg={"black"}
          color={"white"}
          position="fixed"
          h={"60px"}
          w={"364px"}
          zIndex="9999"
          ml={"25px"}
          borderRadius={"5px"}
          pt={"15px"}
          mt={"calc(100vh - 170px)"}
          onClick={startTour}
        >
          <Heading size="md" textAlign="center">
            {t?.tours.start || "Start Tour"}
          </Heading>
        </Box>

        <Flex
          bg={`url(${metPicture})`}
          backgroundSize="cover"
          h="300px"
          direction="column"
        >
          <Flex h="80px" justify="flex-end" align="flex-end">
            <Box onClick={handleSaving} w="35px" mr="30px">
              {favorite ? (
                <Image pt="5px" pl="3px" src={FavHeartFilled} />
              ) : (
                <Image src={FavHeart} />
              )}
            </Box>
          </Flex>
          <Flex align="flex-end" h="100%">
            <Box pl="20px" pb="20px">
              <Heading color="white" fontWeight="500" size="md">
                {tourData.name}
              </Heading>
              <Flex>
                <Image p="2px" src={TimeWhite} pt="5px" />
                <Text color="white" fontSize="1.2em" m="0px 10px">
                  {time}
                </Text>
                <Heading color="white" size="md" m="0px 10px">
                  |
                </Heading>
                <Image src={paint} p="2px" pt="5px" />
                <Text color="white" fontSize="1.2em" m="0px 10px">
                  {tourData.artworkData?.length}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>

        <Box mb="180px">
          {tourData.artworkData &&
            tourData.artworkData.map((artPiece) => (
              <PieceCard
                key={artPiece.objectID}
                art={artPiece}
                cannotDelete={true}
              />
            ))}
        </Box>
      </>
    )
  );
}

export default ItineraryPage;
