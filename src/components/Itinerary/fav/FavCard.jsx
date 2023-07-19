import { Card, CardBody, Stack, Heading, Text , Image} from "@chakra-ui/react"



function FavCard({
    tour
}) {
    return (
        <>
            <Card maxW='sm'>
                <CardBody>
                    <Image
                        src={tour.picture}
                        alt=''
                        borderRadius='sm'
                        maxW="xs"
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{tour.name}</Heading>
                        <Text>
                            MET MUSEUM
                        </Text>
                    </Stack>
                </CardBody>
        
            </Card>


        </>
    )
}

export default FavCard