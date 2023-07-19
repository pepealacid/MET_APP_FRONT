import { useParams } from "react-router-dom"
import itineraryService from "../../services/itinerary.service"
import { useEffect, useState } from "react"
import { Box, Button } from "@chakra-ui/react"
import TourCard from "../../components/Itinerary/guidedTour/tourCard"
import { useNavigate } from "react-router-dom"


function GuidedTourPage() {
    const [finalTour, setFinalTour] = useState([])
    const [swipeCount, setSwipeCount] = useState(0)
    const navigate = useNavigate()

    let { id } = useParams()
    useEffect(() => {
        getTour(id)
    }, [])

    const getTour = async (id) => {
        const res = await itineraryService.getItineraryById(id)
        groupArtByGalleries(res.data)
    }
    const groupArtByGalleries = (data) => {
        if (data.path) {
            const objectData = data.path.map(gallery => {
                const artPieces = []
                data.artworkData.forEach(artPiece => {
                    artPiece.GalleryNumber == gallery ?
                        artPieces.push(artPiece) : null
                })
                return {
                    gallery,
                    artPieces
                }
            })
            defineTourPath(objectData)
        }
    }

    const defineTourPath = (objectData) => {
        const swipeData = objectData.flatMap(gallery => {
            if (gallery.artPieces.length) {
                const galleryArt = gallery.artPieces.map(piece => ({
                    gallery: gallery.gallery,
                    artwork: piece
                }))
                return (galleryArt)

            }

            return {
                gallery: gallery.gallery
            }
        })
        swipeData.push({ gallery: "End" })
        setFinalTour(swipeData)
    }
    const goToNextPiece = ()=>{
        swipeCount < finalTour.length-1 ? 
            setSwipeCount( swipeCount +1):
            endTour()
    }

    const endTour = ()=>{
        navigate("/tour/end")
    }

    return (
        <Box>
            { finalTour && 
                <TourCard currentGallery={finalTour[swipeCount]} />
            }
            <Button onClick={endTour}>
                End tour
            </Button>
            <Button onClick={goToNextPiece}>
                Next
            </Button >
        </Box>
    )
}

export default GuidedTourPage