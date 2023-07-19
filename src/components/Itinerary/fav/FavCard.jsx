import { Card, CardBody, Stack, Heading, Text, Image } from "@chakra-ui/react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"




function FavCard({ tour }) {

    const [hasBeenClick, setHasBeenClick] = useState(false)


    const tourId = tour._id
    const navigate = useNavigate()

    const goToDetailsPage = ()=>{
        navigate(`/itinerary/${tourId}`)
    }
    return (
        <>
            {hasBeenClick && (
                <Navigate to={url} />
            )}
            <Card maxW='sm' onClick={goToDetailsPage} >
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