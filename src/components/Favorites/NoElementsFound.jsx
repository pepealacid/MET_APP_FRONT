import { Box, Image, Heading, Text, Flex } from "@chakra-ui/react"
import noHeart from "../../assets/images/noHeart.png"
import { useNavigate } from "react-router"


function NoElementsFound({ children, exploreIn }) {
    const navigate = useNavigate()

    const goExplore = ()=>{
        navigate(exploreIn)
    }

    return (<>
        <Flex
            w="vw" h="vh"
            mt={"70px"}
            align="center"
            justify="center"
            direction="column"
            mb={"200px"}
        >

            <Image src={noHeart} w={"50px"} pb={"5px"}/>

            <Heading as="h4" size="md" w={"200px"} textAlign="center" pb={"5px"}>
                You have no favorite {children}
            </Heading>

            <Text pb={"5px"} w={"250px"} textAlign="center" mt="10px">
                All the {children} you mark as favorite will appear here
            </Text>

            <Box bg={"black"}
                color="white"
                w={"234px"}
                borderRadius={"6px"}
                height={"45px"}
                pt="9px"
                mt="20px"
                onClick={goExplore}
                >
                <Heading size="md" textAlign="center">
                    Go Explore!
                </Heading>
            </Box>

        </Flex>
    </>)
}

export default NoElementsFound