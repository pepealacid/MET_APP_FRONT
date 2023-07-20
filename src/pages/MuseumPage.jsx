import {
  Box,
  Grid,
  Image,
  GridItem,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import metData from "../data/museumData";
import ButtonPicker from "../components/museumView/ButtonPicker/ButtonPicker";
import { useState } from "react";
import About from "../components/museumView/about/About";
import MetArtworks from "../components/museumView/Artworks/MetArtworks";
import Tickets from "../components/museumView/Tickets/Tickets";

function MuseumPage() {
  const [selected, setSelected] = useState("About");

  let content;
  switch (selected) {
    case "About":
      content = <About />;
      break;
    case "Tickets":
      content = <Tickets />;
      break;
    case "Artworks":
      content = <MetArtworks />;
      break;
    default:
      content = null;
  }

  return (
    <>
       <Box
      bgImage={metData.image}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      w={"100vw"} 
      h={"50vh"} 
      mr={0}
    />
      <ButtonPicker
        options={["About", "Tours", "Tickets", "Artworks"]}
        selected={selected}
        setSelected={setSelected}
      />
      {content}
    </>
  );
}

export default MuseumPage;
