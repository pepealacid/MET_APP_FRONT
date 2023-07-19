import { Card, Image, Stack, CardBody, Heading, Text, CardFooter, Button } from "@chakra-ui/react"


function PieceCard({ art, deleteOne, cannotDelete }) {
    // console.log("This is the art", art)


    return (<>

        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '150px' }}
                src={art.primaryImage}
                alt="This artpieces has not picture"
            />

            <Stack>
                <CardBody>
                    <Heading size='sm'>{art.title}</Heading>


                    <Text py='2'>
                        {art.artistDisplayName}
                    </Text>

                    <Text>
                        {`${art.objectDate} | Room ${art.GalleryNumber}`}
                    </Text>

                    {
                        cannotDelete ?
                            null :
                            <Button onClick={() => {
                                deleteOne(art.objectID)
                            }}>
                                X
                            </Button>

                    }

                </CardBody>

            </Stack>
        </Card>
    </>)
}

export default PieceCard