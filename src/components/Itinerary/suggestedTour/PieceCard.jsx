import { Box, Image, Flex, CardBody, Heading, Text, CardFooter, Button } from "@chakra-ui/react"
import SandClock from "../../../assets/images/SandClock.png"


function PieceCard({ art, deleteOne, cannotDelete }) {
    return (<>

        <Box mt="12px" mb="12px" > 
            <Flex justify="space-around" mt="3px" mb="3px" bg="white" boxShadow='lg'>
                <Flex
                    align="center"
                    pl="8px"
                >
                    <Image src={art.primaryImage}
                        alt="This artpieces has not picture"
                        minW="80px"
                        maxW="80px"
                        h="80px"

                        borderRadius="4px"
                    />
                </Flex>
                <Box p="16px">
                    <Heading size="sm" >
                        {art.title}
                    </Heading>
                    <Text mt="6px">
                        {
                            art.artistDisplayName ?
                                art.artistDisplayName :
                                "Unkown artist"
                        }
                    </Text>
                    <Flex>
                        <Box>
                            <Image src={SandClock}></Image>
                        </Box>
                        <Text>
                            {`${art.objectDate} | Room ${art.GalleryNumber}`}
                        </Text>
                    </Flex>
                </Box>

                <Box p="8px" >
                    {
                        cannotDelete ?
                            null :
                            <Text fontSize="25px" pt="20px" mr="10px"  onClick={() => {
                                deleteOne(art.objectID)
                            }}>
                                X
                            </Text>

                    }
                </Box>

            </Flex>
        </Box>

    </>)
}

export default PieceCard