import { Box, Flex, Spacer , Grid, Image, GridItem, useBreakpointValue, Button } from "@chakra-ui/react";
import"./buttonPicker.css"


function ButtonPicker({options, selected, setSelected}){

    const handleChange = (option)=>{
        setSelected(option)
    }



    return (
        <Grid templateColumns="repeat(4, 1fr)" m={4} mt={4} gap={1}>
            {
                options.map(option=>
                    <GridItem w='100%' key={option} >
                        <button
                            className={option === selected ? "pressed" : "non-pressed"}
                            onClick={() => { handleChange(option) }}
                        >
                            {option}
                        </button >
                    </GridItem>
                )
            }
        </Grid>
    )
}

export default ButtonPicker