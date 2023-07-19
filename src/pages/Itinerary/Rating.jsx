import { Text, Heading, Button, Box, Flex } from "@chakra-ui/react"
import { useState } from "react"


function Rating({ children, setPage, page }) {
    const stars = [1, 2, 3, 4, 5]
    const [starsNo, setStarsNo] = useState(0)

    const goToNextPage = () => {
        setPage(page + 1)
    }

    const changeStars = (number)=>{
        setStarsNo(number)
    }
    return (<>
        <Button onClick={goToNextPage}>Skip</Button>

        <Flex>
            {
                stars.map(star => {
                    return (
                        <Text 
                            onClick={() => { changeStars(star)}} 
                            key={star} 
                            color={star <= starsNo ? "yellow" :  "whitesmoke" }
                            fontSize={"80px"}
                        >
                            ★
                        </Text>
                    )
                })
            }

        </Flex>

        <Box onClick={goToNextPage}>
            →
        </Box >
    </>)
}

export default Rating
