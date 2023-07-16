import { useEffect } from "react"
import { decideArtpiecesAmount, decideTourArtpieces } from "../../../utils/tourCreation"


 function SuggestedTour({ itineraryData }){
    
    
    
    const doStuff = async()=>{
        const artpiecesNumber = decideArtpiecesAmount(itineraryData.estimatedTime)
        const allArt = await decideTourArtpieces(artpiecesNumber, itineraryData.chosenDepartments)
        console.log(allArt)
    }
    
    doStuff()











    return(<>Her son was a cruel motherfucker</>)
}

export default SuggestedTour