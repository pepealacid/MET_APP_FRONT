import { useEffect, useState } from "react"
import { decideArtpiecesAmount, decideTourArtpieces } from "../../../utils/tourCreation"
import { Box } from "@chakra-ui/react"
import PieceCard from "./PieceCard"
import SuggestedTime from "./SuggestedTime"


 function SuggestedTour({ itineraryData }){
    const [pieces, setPieces]= useState([])
    const [galleries, setGalleries] = useState([])
    const [artData, setArtData]= useState([])

    useEffect(()=>{
        selectArtpieces()
    }, [])


    const selectArtpieces = async()=>{
        const artpiecesNumber = decideArtpiecesAmount(itineraryData.estimatedTime)
        const res = await decideTourArtpieces(artpiecesNumber, itineraryData.chosenDepartments)
        setPieces(res.selectedPieces)
        setGalleries(res.galleries)
        setArtData(res.piecesData)
        
    }

    const deleteOne = id =>{
        const removedOneById = pieces.filter((pieceId)=> pieceId != id )
        setPieces(removedOneById)
        removeFromDataCard(id)
    }

     const removeFromDataCard = id => {
        let gallery 
        const removedOneById = artData.filter((data) =>{
            if (data.objectID != id){
                return true
            }
            const galleryId = data.GalleryNumber
            removeOneGallery(galleryId)
            console.log("The gallery removed is", gallery)


        })
        setArtData(removedOneById)
    }
    const removeOneGallery= (galleryId) =>{
        const index = galleries.indexOf(galleryId);
        if (index !== -1) {
            const newArr = [...galleries];
            newArr.splice(index, 1);
            setGalleries(newArr)
        }
        
    }

    


    
    return(<>
        <Box>
            <SuggestedTime 
                galleries={galleries}
                pieces={pieces}
                />
        </Box>
        <Box>
            {artData.map(art => <Box key={art.objectID}>
                <PieceCard 
                    art={art}
                    deleteOne={deleteOne}
                />
            </Box>)}
        </Box>
    
    </>)
}

export default SuggestedTour