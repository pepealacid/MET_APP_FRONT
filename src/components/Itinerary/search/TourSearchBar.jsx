import { useState } from "react"
import { Input, Box, Spinner, Center} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import "../../../main.css"



function TourSearchBar({setQuery, decideResults}) {
    const [value, setValue] = useState("")

    const handleSubmit = async (event) => {

        event.preventDefault();
        setQuery(value)
        decideResults(value)
        
        }

    const handleChange = (event)=> {
        setValue(event.target.value)
    }

    return (<>
        <Box position="relative">
            <form onSubmit={handleSubmit}>
                <Box position="relative" marginTop="2rem" marginBottom="2rem">
                    <SearchIcon
                        position="absolute"
                        left="2.2rem"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.300"
                    />
                    <Center>
                        <Input
                            placeholder="       Search for tours"
                            className="search-bar"
                            size="md"
                            w="90%"
                            value={value}
                            onChange={handleChange}

                        />
                    </Center>
                </Box>
            </form>

        </Box>
    </>)
}

export default TourSearchBar