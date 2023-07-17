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

    const [finalData, setFinalData] = useState({
        departments: [], 
        departmentsId: [], 
        artworkId: [], 
        artworkData:[],
        galleriesId: [], 
        calculatedTime: 0, 
        desiredTime: 0, 
        path: [],
        name: ""
    })

    const handleDataChange = (propertyName, propertyValue)=>{
        setFinalData(prevState => ({
            ...prevState,
            [propertyName]: propertyValue
        }))
    }

    const finalProps = {finalData, setFinalData, handleDataChange}

    return (
        <>
            {page === "setItineraryTime" &&
                <SetItineraryTime
                    setItineraryData={setItineraryData}
                    setPage={setPage}
                    {...finalProps}
                    
                />}
            {page === "TagSelection" &&
                <TagSelection 
                setItineraryData={setItineraryData}
                setPage={setPage} 
                {...finalProps}

                />
            }
            {
                page === "SuggestedTour" &&
                <SuggestedTour
                    itineraryData={itineraryData} 
                    setItineraryData={setItineraryData}
                    {...finalProps}

                />
            }


        </>
    )
}

export default NewItineraryPage