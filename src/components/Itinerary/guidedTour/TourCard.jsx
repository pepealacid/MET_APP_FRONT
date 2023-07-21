import ArtworkCard from "./artworkCard"
import { Box, Heading } from "@chakra-ui/react"

function TourCard({currentGallery}){
    

    return (<>
        
        {
            currentGallery?.artwork ?
                <ArtworkCard artpiece={currentGallery.artwork} gallery={currentGallery.gallery}/>

            :
                <Box p="15px" pt="45px">
                    <Box boxShadow="2xl" >
                        <Heading fontSize="20px"
                            color="#356670"
                            w="350px"
                            pt="20px"
                            pb="20px"
                            pl="40px"
                            textAlign="center"
                        >

                            In order to go to the next artwork you have to go the {currentGallery && currentGallery?.gallery} gallery
                        </Heading>
                    </Box>
                </Box>
                
                 
        }
        {
           
        }
        </>)

}

export default TourCard