import { useState } from "react"
import SetItineraryTime from "../../components/Itinerary/SetItineraryTime"
import TagSelection from "../../components/Itinerary/tagSelection/TagSelection"
import SuggestedTour from "../../components/Itinerary/suggestedTour/SuggestedTour"


function NewItineraryPage() {
    const [itineraryData, setItineraryData] = useState({
        name: "My itinerary",
        artpieces: [],
        estimatedTime: [0, 0], 
        chosenDepartments: []
    })
    const [page, setPage] = useState("setItineraryTime")

    return (
        <>
            {page === "setItineraryTime" &&
                <SetItineraryTime
                    setItineraryData={setItineraryData}
                    setPage={setPage}
                />}
            {page === "TagSelection" &&
                <TagSelection 
                setItineraryData={setItineraryData}
                setPage={setPage} 
                />
            }
            {
                page === "SuggestedTour" &&
                <SuggestedTour
                    itineraryData={itineraryData} 
                    setItineraryData={setItineraryData}
                />
            }


        </>
    )
}

export default NewItineraryPage