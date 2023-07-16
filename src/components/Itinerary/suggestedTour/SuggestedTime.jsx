import turnIntoNumber from "../../../utils/stringToNumber"
import { convertToHoursAndMinutes } from "../../../utils/functions"
import graph from "../../../utils/mapGraph"
import { useEffect, useState } from "react"
import { Box, Heading, Spinner, Text } from "@chakra-ui/react"

function SuggestedTime({ galleries, pieces }) {

    const [time, setTime] = useState(0)

    useEffect(() => {
        const vertices = galleries.map(name => turnIntoNumber(name))
        const shortestPath = graph.findShortestPath(vertices)
        shortestPath ? setTime(shortestPath.length * 2 + pieces.length * 3) : null
        console.log("The shortest path is", shortestPath, "the time is", time)
    }, [galleries, pieces])





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