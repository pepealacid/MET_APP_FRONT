import { Box, Grid, Image, GridItem, useBreakpointValue, Button } from "@chakra-ui/react";
import metData from "../data/museumData";
import ButtonPicker from "../components/museumView/ButtonPicker/ButtonPicker";
import { useState } from "react";
import About from "../components/museumView/about/About";

function MuseumPage() {
    const [selected, setSelected]= useState("About")

    return (
        <>
            <Box bgImage={metData.image}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                w={"120vw"}
                h={"50vh"}
                mr={0}
            >

            </Box>

            <ButtonPicker
                options={
                    ["About", "Tours", "Tickets", "Artworks"]
                }
                selected={selected}
                setSelected={setSelected}
            />
            {selected === "About" && <About />}
            

        </>





    );
}


export default MuseumPage;