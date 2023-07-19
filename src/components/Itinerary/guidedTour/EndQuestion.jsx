import { Text, Heading, Button, Box } from "@chakra-ui/react"


function EndQuestion({children, setPage, page}) {

    const goToNextPage = ()=>{
        setPage( page + 1)
    }
    return (<>
        <Button onClick={goToNextPage}>Skip</Button>
        <Heading >
            {children}
        </Heading>
        <Button bg="white" onClick={goToNextPage}>
            No
        </Button>
        <Button bg="black" color="white" onClick={goToNextPage}>
            Yes
        </Button>

        <Box onClick={goToNextPage}>
            →
        </Box >
    </>)
}

export default EndQuestion