import { Text, Box, Wrap, WrapItem, Center, Image, Flex, Checkbox, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import apiMET from "../../../services/apiMET.service"
import "./tagSelection.css"
import Progress2 from "../../../assets/images/Progress2.png"
import Next from "../../../assets/images/Next.svg"


function TagSelection({ setItineraryData, setPage, finalData, setFinalData, handleDataChange }) {
    const [departments, setDepartments] = useState([])
    const [selectedDepartmentsName, setSelectedDepartmentsName] = useState([])
    const [selectedDepartments, setSelectedDepartments] = useState([])
    const [onlyHighlights, setOnlyHighlights] = useState(false)
    const [message, setMessage] = useState(null)


    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        const apiResponse = await apiMET.getDepartments()
        setDepartments(apiResponse.data.departments)
    }

    const handleSelection = (e, id, name) => {
        if (selectedDepartments.includes(id)) {
            setSelectedDepartments(
                selectedDepartments.filter(departmentId => departmentId != id)
            )
            setMessage(null)
        } else {
            setSelectedDepartments([...selectedDepartments, id])
            setSelectedDepartmentsName([...selectedDepartmentsName], name)
        }
    }
    const handleCheck = () => {
        setOnlyHighlights(!onlyHighlights)
    }
    const handleSend = event => {
        if (selectedDepartments.length) {
            setItineraryData(prevState => ({
                ...prevState,
                chosenDepartments: selectedDepartments
            }))
            handleDataChange("departmentsId", selectedDepartments)
            handleDataChange("departments", selectedDepartmentsName)
            setPage("SuggestedTour")
        } else {
            setMessage("You have to choose at least one tag")
        }
    }


    return (
        <>
            <Box w="100%"
                h="100vh"
                bg={`#f5f2f2`}
            >
                <Box minH="calc(100vh - 100px)" >
                    
                    <Heading ml="18px" pt="85px" fontSize="25px" w="300px" color={"#356670"}>
                        Which artist movement wouldn't you like to miss out?

                    </Heading>

                    <Wrap w="400px" justify="center" pl="20px" mt="40px" >
                        {departments.map(({ departmentId, displayName }) =>
                            <WrapItem
                                display="flex"
                                alignItems="center"
                                className={
                                    selectedDepartments.includes(departmentId) ? "selected" : "non-selected"}
                                key={departmentId}
                                onClick={(e) => { handleSelection(e, departmentId, displayName) }}
                            >
                                <Center>
                                    {displayName}
                                </Center>
                            </WrapItem>)}
                    </Wrap>
                    <Flex p={4} >
                        <Checkbox checked={onlyHighlights} /> <Text size="sm">I only want to see the most important artworks</Text>
                    </Flex>


                    <Heading color="orange" ml="30px" as="h6" size="sm" mt="20px">
                        {message}
                    </Heading>
                </Box>

                <footer>
                    <Flex h="100px" justify="space-between">
                        <Box align="center" justify="center" pt={"50px"} pl="20px">
                            <Image src={Progress2} />
                        </Box>
                        <Image src={Next} p="20px" onClick={handleSend} />
                    </Flex>
                </footer>
                
            </Box>
        </>
    )
}

export default TagSelection