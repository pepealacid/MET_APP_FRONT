import { Image, Heading, Flex, Box, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import Next from "../../../assets/images/Next.svg"
import Progress1 from "../../../assets/images/Progress1.png"
import Progress2 from "../../../assets/images/Progress2.png"


function EndQuestion({ children, setPage, page }) {
    const navigate = useNavigate()

    const goToNextPage = () => {
        setPage(page + 1)
    }
    const skip = () => {
        navigate("/home/tours")
    }
    return (<>
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
                <Heading ml="18px" pt="80px" fontSize="25px" w="300px" h="250px" color={"#356670"}>
                    {children}
                </Heading>
                <Box w="100%" align="center" mt={"50px"}>
                    <Flex
                        h="60px"
                        justify="center"

                    >
                        <Box bg="white" color="black" w="180px" mr="12px" borderRadius="7px" boxShadow="lg"
                            onClick={goToNextPage}
                        >
                            <Text fontSize="20px" mt={"12px"}>
                                No
                            </Text>
                        </Box>
                        <Box bg="black" color="white" w="180px" borderRadius="7px" boxShadow="lg"
                            onClick={goToNextPage}
                        >
                            <Text fontSize="20px" mt={"12px"}>
                                Yes
                            </Text>
                        </Box>

                    </Flex>
                </Box >

            </Box>

            <Flex h="100px" justify="space-between">
                <Box align="center" justify="center" pt={"50px"} pl="20px">
                    {
                        page == 1 &&
                        <Image src={Progress1} />
                    }
                    {
                        page == 2 &&
                        <Image src={Progress2} />
                    }

                </Box>
                <Image src={Next} p="20px" onClick={goToNextPage} />
            </Flex>
        </Box>

    </>)
}

export default EndQuestion