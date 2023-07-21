import { Image, Flex, Text, Heading, Box } from '@chakra-ui/react'
import { useState } from 'react'
import SandClock from "../../../assets/images/SandClock.png"
import LessArrow from "../../../assets/images/LessArrow.png"
import MoreArrow from "../../../assets/images/MoreArrow.png"





function ArtworkCard({ artpiece, gallery }) {
    console.log(artpiece)
    const [display, setDisplay] = useState(false)
    const changeDisplay = () => {
        setDisplay(!display)
    }
    return (

        <>

            <Box pt="40px" mb="12px" ml="16px">
                <Box mt="3px" mb="3px" bg="white" boxShadow='dark-lg' w="385px" >
                    <Flex justify="flex-start">
                        <Flex
                            align="center"
                            pl="8px"
                        >
                            <Image src={artpiece.primaryImage}
                                alt="This artpieces has not picture"
                                minW="80px"
                                maxW="80px"
                                h="80px"

                                borderRadius="4px"
                            />
                        </Flex>
                        <Box p="16px">
                            <Heading size="sm" >
                                {artpiece.title}
                            </Heading>
                            <Text mt="6px">
                                {
                                    artpiece.artistDisplayName 
                                        ?
                                        artpiece.artistDisplayName
                                        :
                                        "Unkown artist"
                                }
                            </Text>
                            <Flex>
                                <Box>
                                    <Image src={SandClock}></Image>
                                </Box>
                                <Text>
                                    {`${artpiece.objectDate} | Room ${artpiece.GalleryNumber}`}
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                    {
                        display &&
                        <Box pl="20px" pr="20px">
                            <Text py='2'>
                                {
                                    artpiece.artistDisplayBio &&
                                    "Artist biography: " + artpiece.artistDisplayBio
                                }
                            </Text>
                            <Text py='2'>
                                {
                                    artpiece.objectName &&
                                    "Type of art: " + artpiece.objectName
                                }
                            </Text>
                            <Text py='2'>
                                {
                                    artpiece.medium &&
                                    "Created through: " + artpiece.medium
                                }
                            </Text>
                        </Box>
                    }
                    <Flex  h="40px" justify="center">
                        {display ? 
                            
                         
                            <Image src={LessArrow} onClick={changeDisplay} />
                            :
                            <Image src={MoreArrow} onClick={changeDisplay} />

                        }
                    </Flex>
                </Box>
            </Box>
        </>
    )

}

export default ArtworkCard