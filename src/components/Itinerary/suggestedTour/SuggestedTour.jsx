import { useEffect, useState, useContext } from "react"
import { decideArtpiecesAmount, decideTourArtpieces } from "../../../utils/tourCreation"
import { Box, Button } from "@chakra-ui/react"
import PieceCard from "./PieceCard"
import SuggestedTime from "./SuggestedTime"
import itineraryService from "../../../services/itinerary.service"
import { AuthContext } from "../../../context/auth.context"



function SuggestedTour({ itineraryData, finalData, handleDataChange }) {
    const [pieces, setPieces] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const [artData, setArtData] = useState([]);
    const [time, setTime] = useState(0);
    const allStates = { pieces, galleries, artData, time, setTime}
    const { user } = useContext(AuthContext);


    useEffect(() => {
        selectArtpieces();
    }, []);


    const createItinerary = async () => {
        try {
            const newItinerary = await itineraryService.create(finalData);
            const itineraryId = newItinerary.data._id
            await saveInUsersItineraries(itineraryId)
        } catch (error) {
            console.log(error);
        }
    };

    const saveInUsersItineraries = async(id)=>{
        try {
            const userId = getUserId()
            const itineraryId = { itineraryId : id}
            await itineraryService.addItinerary(userId, itineraryId)
        } catch (error) {
            console.log(error)
        }

    }

    const getUserId = ()=>{
        return user.data._id
    }

   

    const selectArtpieces = async () => {
        const artpiecesNumber = decideArtpiecesAmount(itineraryData.estimatedTime);
        const res = await decideTourArtpieces(artpiecesNumber, itineraryData.chosenDepartments);
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
        <>
            <Box>
                <SuggestedTime
                    {...allStates}
                    handleDataChange={handleDataChange}
                    
                />
            </Box>
            <Box>
                {artData.map((art) => (
                    <Box key={art.objectID}>
                        <PieceCard art={art} deleteOne={deleteOne} />
                    </Box>
                ))}
            </Box>
            {artData.length ? (
                <Button onClick={()=>{
                    createItinerary()
                }}>Save tour</Button>
            ) : null}
        </>
    );
}

export default SuggestedTour;
