import { useState, useContext, useEffect } from "react";
import FavFieldsButtons from "../FavFieldsButtons";
import NoElementsFound from "./NoElementsFound";
import itineraryService from "../../services/itinerary.service";
import { AuthContext } from "../../context/auth.context";
import { Box } from "@chakra-ui/react";
import FavCard from "../Itinerary/fav/favCard";


const ToursFavorites = () => {
  const [savedTour, setSaveTour] = useState(null)
  const { user } = useContext(AuthContext);


  useEffect(() => {
    getUserSavedItineraries()
  }, [user]);


  const getUserSavedItineraries = async () => {
    try {
      const userId = user?.data._id
      if (userId) {
        const res = await itineraryService.getUserItineraries(userId)
        setSaveTour(res.data)
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <div>
      <h3>ToursFavorites</h3>
      <FavFieldsButtons />
      {
        savedTour
          ?
          <Box>
            {
              savedTour.map((tour)=> <FavCard key={tour._id} tour={tour}/>) 
            }
          </Box>
          :
          <NoElementsFound> tours </NoElementsFound>
      }

    </div>
  );
};

export default ToursFavorites;
