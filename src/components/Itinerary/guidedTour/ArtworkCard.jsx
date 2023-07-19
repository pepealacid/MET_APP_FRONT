import { Card, CardBody, CardFooter, Image, Stack, Text, Heading, Button, Box } from '@chakra-ui/react'
import { useState } from 'react'

function ArtworkCard({ artpiece, gallery }) {
    console.log(artpiece)
    const [display, setDisplay] = useState(false)
    const changeDisplay = ()=>{
        setDisplay(!display)
    }
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '50px' }}
                src={artpiece.primaryImage}
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>
                        {artpiece.title}
                    </Heading>

                    <Text py='3'>
                        {
                            artpiece.artistDisplayName
                        }
                    </Text>
                    <Text py='2'>
                        {
                            artpiece.objectDate + " | " + "Room " + gallery
                        }
                    </Text>
                    {display && <Box>
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

                    </Box>}

                </CardBody>

                <CardFooter>
                    <Button onClick={changeDisplay}>
                        {display ? "↑" : "↓"}
                    </Button>
                </CardFooter>
            </Stack>

        </Card>
    )

}

export default ArtworkCard