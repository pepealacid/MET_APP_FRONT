import { Image, Heading, Flex, Box, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import Next from "../../assets/images/Next.svg"
import Progress3 from "../../assets/images/Progress3.png"

import { useState } from "react"



function Rating({ children, setPage, page }) {
    const stars = [1, 2, 3, 4, 5]
    const [starsNo, setStarsNo] = useState(5)
    const navigate = useNavigate()

    const goToNextPage = () => {
        setPage(page + 1)
    }

    const changeStars = (number) => {
        setStarsNo(number)
    }
    const skip = () => {
        navigate("/home/tours")
    }
    return (
        <>
            <Box w="100%"
                h="100vh"
                bg={`#f5f2f2`}
            >

                <Box minH="calc(100vh - 100px)" >
                    <Flex justify="flex-end">
                        <Box
                            textDecoration="underline"
                            w="70px" fontSize="20px"
                            fontWeight="500"
                            pt="2px" mt="30px"
                            onClick={skip}

                        >
                            Skip
                        </Box>
                    </Flex>
                    <Heading  ml="18px" pt="80px" fontSize="25px" w="300px" h="200px" color={"#356670"}>
                        Overall, how would you rate the experience with this tour?
                    </Heading>
                    <Box w="100%" align="center">
                        <Flex pl="25px" >
                            {
                                stars.map(star => {
                                    return (
                                        <Text
                                            onClick={() => { changeStars(star) }}
                                            key={star}
                                            color={star <= starsNo ? "orange" : "white"}
                                            fontSize={"80px"}
                                        >
                                            ★
                                        </Text>
                                    )
                                })
                            }

                        </Flex>

                    </Box >

                </Box>

                <Flex h="100px" justify="space-between">
                    <Box align="center" justify="center" pt={"50px"} pl="20px">

                        <Image src={Progress3} />

                    </Box>
                    <Image src={Next} p="20px" onClick={goToNextPage} />
                </Flex>
            </Box>

        </>

        // <>
        //     <Button onClick={goToNextPage}>Skip</Button>


        //     <Box onClick={goToNextPage}>
        //         →
        //     </Box >
        // </>
    )
}

export default Rating
