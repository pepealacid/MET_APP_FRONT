import { Box, Heading, Text, Grid, GridItem } from "@chakra-ui/react"
import metData from "../../../data/museumData"
import { useState } from "react"

function About(){
    const [readMore, setReadMore] = useState(false)

    const handleRead = ()=>{
        setReadMore(!readMore)
    }
    return(
        <Box m={6} mt={8}>
            <Heading as='h3' size='md' noOfLines={1}>
                About the museum
            </Heading>
            <Text mt={10} noOfLines={readMore? null: 5}>
                {metData.about}
            </Text>
            <Grid templateColumns="repeat(3, 1fr)">
                <GridItem >
                    <button onClick={handleRead}>
                        <Text as="u" textAlign="left">
                            {readMore? "Read Less": "Read More"}
                        </Text>
                    </button>
                </GridItem>
            </Grid>
        </Box>

    )
}

export default About