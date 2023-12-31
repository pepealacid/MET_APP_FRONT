import { useEffect, useState, useContext } from "react";
import {
  decideArtpiecesAmount,
  decideTourArtpieces,
} from "../../../utils/tourCreation";
import { Box, Heading } from "@chakra-ui/react";
import PieceCard from "./PieceCard";
import SuggestedTime from "./SuggestedTime";
import itineraryService from "../../../services/itinerary.service";
import { AuthContext } from "../../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../context/language.context";

function SuggestedTour({ itineraryData, finalData, handleDataChange }) {
  const [pieces, setPieces] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [artData, setArtData] = useState([]);
  const [time, setTime] = useState(0);
  const allStates = { pieces, galleries, artData, time, setTime };
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { t } = useContext(LanguageContext);

  useEffect(() => {
    selectArtpieces();
  }, []);

  const createItinerary = async () => {
    try {
      const newItinerary = await itineraryService.create(finalData);
      const itineraryId = newItinerary.data._id;
      await saveInUsersItineraries(itineraryId);
      navigate(`/itinerary/${itineraryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const saveInUsersItineraries = async (id) => {
    try {
      const userId = getUserId();
      const itineraryId = { itineraryId: id };
      await itineraryService.addItinerary(userId, itineraryId);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserId = () => {
    return user.data._id;
  };

  const selectArtpieces = async () => {
    const artpiecesNumber = decideArtpiecesAmount(itineraryData.estimatedTime);
    const res = await decideTourArtpieces(
      artpiecesNumber,
      itineraryData.chosenDepartments
    );
    setPieces(res.selectedPieces);
    setGalleries(res.galleries);
    setArtData(res.piecesData);
  };

  const deleteOne = (id) => {
    const removedOneById = pieces.filter((pieceId) => pieceId !== id);
    setPieces(removedOneById);
    removeFromDataCard(id);
  };

  const removeFromDataCard = (id) => {
    const removedOneById = artData.filter((data) => {
      if (data.objectID !== id) {
        return true;
      }
      const galleryId = data.GalleryNumber;
      removeOneGallery(galleryId);
    });
    setArtData(removedOneById);
  };

  const removeOneGallery = (galleryId) => {
    const index = galleries.indexOf(galleryId);
    if (index !== -1) {
      const newArr = [...galleries];
      newArr.splice(index, 1);
      setGalleries(newArr);
    }
  };

  return (
    t?.tours && (
      <Box w="100%" h="100%">
        <>
          {artData.length ? (
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
              mt={"calc(100vh - 80px)"}
              onClick={createItinerary}
            >
              <Heading size="md" textAlign="center">
                {t?.tours.save || "Save tour"}
              </Heading>
            </Box>
          ) : null}
          <Box>
            <SuggestedTime {...allStates} handleDataChange={handleDataChange} />
          </Box>
          <Box>
            {artData.map((art) => (
              <Box key={art.objectID}>
                <PieceCard art={art} deleteOne={deleteOne} />
              </Box>
            ))}
          </Box>
        </>
      </Box>
    )
  );
}

export default SuggestedTour;
