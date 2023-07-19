
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import itineraryService from "../../services/itinerary.service"
import PieceCard from "../../components/Itinerary/suggestedTour/PieceCard"
import { convertToHoursAndMinutes } from "../../utils/functions"
import { Box, Image } from "@chakra-ui/react"
import { AuthContext } from "../../context/auth.context"



function ItineraryPage() {
    const metPicture = "https://upload.wikimedia.org/wikipedia/commons/b/ba/Details_of_the_Met.JPG"
    const { user } = useContext(AuthContext);

    const [tourData, setTourData] = useState([])
    const [time, setTime] = useState([])
    const [favorite, setFavorite] = useState(false)


    let { id } = useParams()
    useEffect(() => {
        getTour(id)
    }, [user])

    const getTour = async (id) => {
        const res = await itineraryService.getItineraryById(id)
        setTourData(res.data)
        setTime(convertToHoursAndMinutes(res.data.calculatedTime))
        decideSavedStatus()
    }

    const decideSavedStatus = async () => {
        const tours = await getSavedTours()
        const boolean = !tours.every(tour => tour._id !== id)
        setFavorite(boolean)
    }

    const removeSaved = async () => {
        const userId = user.data?._id
        try {
            await itineraryService.removeItinerary(userId, {itineraryId : id})
            decideSavedStatus()
        } catch (error) {
            console.log(error)
        }
    }

    const addToSaved = async () => {
        const userId = user.data?._id
        try {
            await itineraryService.addItinerary(userId, { itineraryId: id })
            decideSavedStatus()
        } catch (error) {
            console.log(error)
        }
    }

    const getSavedTours = async () => {
        const userId = user.data?._id
        let savedTours = await itineraryService.getUserItineraries(userId)
        savedTours = savedTours.data
        return savedTours
    }

    const handleSaving = ()=>{
        favorite ?
            removeSaved() :
            addToSaved()
    }


    return (<>
        name {tourData.name}
        time {time}
        pieces {tourData.artworkData?.length}

        <Box
            bg={favorite ? "red" : "blue"}
            onClick={handleSaving}
        >
            {
                favorite ? "it's saved" : "it's not save "
            }
            
        </Box>

        <Box>
            <Image
                objectFit='cover'
                src={metPicture}
                alt=" met's facade"
            />
        </Box>

        <Box>
            {
                tourData.artworkData &&
                tourData.artworkData.map(artPiece =>
                    <PieceCard
                        key={artPiece.objectID}
                        art={artPiece}
                        cannotDelete={true}
                    />)
            }
        </Box>

    </>)
}

export default ItineraryPage