import turnIntoNumber from "../../../utils/stringToNumber"
import { convertToHoursAndMinutes } from "../../../utils/functions"
import graph from "../../../utils/mapGraph"
import { useEffect, useState } from "react"
import { Box, Heading, Spinner, Text } from "@chakra-ui/react"

function SuggestedTime({ galleries, pieces, handleDataChange, artData, time, setTime }) {

    useEffect(() => {
        
            findPath()
            
        
    }, [galleries, pieces, time])

    const findPath = ()=>{
        const vertices = galleries.map(name => turnIntoNumber(name))
        const shortestPath = graph.findShortestPath(vertices)
        console.log("shortest path", shortestPath)
        shortestPath ? setTime(shortestPath.length * 2 + pieces.length * 3) : null
        saveData(shortestPath)
    }

    const saveData = (path)=>{
        handleDataChange("path", path)
        handleDataChange("calculatedTime", time)
        handleDataChange("artworkData", artData)
        handleDataChange("galleriesId", galleries)
        handleDataChange("artworkId", pieces)
        handleDataChange("name", "Personalized tour")
        handleDataChange("picture", artData[0]?.primaryImage)
    } 

    return (<>
        <Box>
            {time ?
                <Box>
                    <Heading>
                        Time need to complete this tour {convertToHoursAndMinutes(time)}
                    </Heading> 
                    <Text>
                        You can add, delete the artworks here. We will notify you if your changes exceed the time of the tour.
                    </Text>
                </Box>
                :
                <Box>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                    <Heading> We are creating the perfect tour for you </Heading>
                </Box>
            }
        </Box>
    </>)
}

export default SuggestedTime