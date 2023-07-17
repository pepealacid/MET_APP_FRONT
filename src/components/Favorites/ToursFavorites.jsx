import { useState, useContext, useEffect } from "react";
import FavFieldsButtons from "../FavFieldsButtons";
import NoElementsFound from "./NoElementsFound";
import itineraryService from "../../services/itinerary.service";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";


const ToursFavorites = () => {
  // const [savedTour, setSaveTour] = useState(null)
  // const { user } = useContext(AuthContext)
  
  // useEffect(()=>{
  //   console.log(user)

  // }, [])
  
  
  // const getUserSavedItineraries = async()=>{
  //   const userId = getUserId()
  //   const saved = await itineraryService.getUserItineraries(userId)
  //   return saved
  //   console.log(saved.data)
  // }
  // const getUserId = () => {
  //   return user
  // }

  // getUserSavedItineraries()


  return (
    <div>
      <h3>ToursFavorites</h3>
      <FavFieldsButtons />
      {savedTour? 
      <>Poner aquí los tours de api</>:
      <NoElementsFound> tours </NoElementsFound>
    }
    </div>
  );
};

export default ToursFavorites;
