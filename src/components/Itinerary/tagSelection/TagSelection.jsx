import { Text, Box, Wrap, WrapItem, Center, Button, Checkbox } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import apiMET from "../../../services/apiMET.service"
import "./tagSelection.css"


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
    const handleCheck = ()=>{
        setOnlyHighlights(!onlyHighlights)
    }
    const handleSend = event => {
        if(selectedDepartments.length){
            setItineraryData(prevState => ({
                ...prevState,
                chosenDepartments : selectedDepartments
            }))
            handleDataChange("departmentsId", selectedDepartments)
            handleDataChange("departments", selectedDepartmentsName)
            setPage("SuggestedTour")
        }else{
            setMessage("You have to choose at least one")
        }
    }
    

    return (
        <>
            <Text>
                Which artist movement wouldn't you like to miss out?
            </Text>
            <Wrap >

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
            <Box p={4}>
                <Checkbox checked={onlyHighlights}/> <Text>I only want to see the most important artworks</Text>
            </Box>
            {message}
            <Button onClick={handleSend}>→</Button>

        </>
    )
}

export default TagSelection