import { useParams } from "react-router-dom"
import itineraryService from "../../services/itinerary.service"
import { useContext, useEffect, useState } from "react"
import { Box, Button, AspectRatio, Heading, useConst} from "@chakra-ui/react"
import TourCard from "../../components/Itinerary/guidedTour/tourCard"
import { useNavigate } from "react-router-dom"
import { LanguageContext } from "../../context/language.context"
const metMap = "https://maps.metmuseum.org/?screenmode=base&floor=1#hash=17.98/40.77923/-73.962729/-61"


function GuidedTourPage() {
    const [finalTour, setFinalTour] = useState([])
    const [swipeCount, setSwipeCount] = useState(0)
    const navigate = useNavigate()

    const { t } = useContext(LanguageContext)

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

    return t?.tours && (
        <Box>
            <Box bg={"black"} color={"white"} position="fixed" h={"45px"}
                w={"190px"} zIndex="9999"
                ml={"210px"} borderRadius={"5px"}
                pt={"5px"} mt={"calc(100vh - 62px)"}

                onClick={goToNextPiece}
            >
                <Heading size="md" textAlign="center">
                    {t?.tours.next || "Next"}
                </Heading>
            </Box>
            <Box bg={"white"} color={"black"} boxShadow="2xl" position="fixed" h={"45px"}
                w={"190px"} zIndex="9999"
                ml={"20px"} borderRadius={"5px"}
                pt={"5px"} mt={"calc(100vh - 60px)"}

                onClick={endTour}
            >
                <Heading size="md" textAlign="center">
                  {t?.tours.end || "End Tour"}
                </Heading>
            </Box>

            { finalTour && 
                <TourCard currentGallery={finalTour[swipeCount]} />
            }
           
            <AspectRatio
                h="400px"
            ratio={4/9}
            >
                <iframe
                    src={metMap}
                />
            </AspectRatio>
        </Box>
    )
}

export default GuidedTourPage