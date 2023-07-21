import { useState, useContext, useEffect } from "react";
import NoElementsFound from "./NoElementsFound";
import itineraryService from "../../services/itinerary.service";
import { AuthContext } from "../../context/auth.context";
import { Box, Grid, GridItem } from "@chakra-ui/react";
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
      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <Box>
      <div>
        {
          savedTour && savedTour.length
            ?
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={4}
              paddingTop={"40px"}
              marginLeft={"10px"}
              mb={"150px"}
            >
              {
                savedTour.map((tour) =>
                  <GridItem key={tour._id} >
                    <FavCard tour={tour} />
                  </GridItem>
                )
              }
            </Grid>
            :
            <NoElementsFound exploreIn="/home/tours" field="tours" /> 
        }
      </div>
    </Box>
  );
};

export default ToursFavorites;
