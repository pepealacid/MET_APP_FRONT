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
import { useState, useContext } from "react";
import About from "../components/museumView/about/About";
import MetArtworks from "../components/museumView/Artworks/MetArtworks";
import Tickets from "../components/museumView/Tickets/Tickets";
import MetPic from "../assets/images/MetPic.jpeg";
import { LanguageContext } from "../context/language.context";

function MuseumPage() {
  const [selected, setSelected] = useState("About");

  const { t } = useContext(LanguageContext)

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

  return t?.buttons && (
    <>
      <Box
        bgImage={MetPic}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        w={"100vw"}
        h={"50vh"}
        mr={0}
      />
      <ButtonPicker
        options={[
          t?.buttons.about || "About",
          t?.buttons.tours || "Tours",
          t?.buttons.tickets || "Tickets",
          t?.buttons.artworks || "Artworks",
        ]}
        selected={selected}
        setSelected={setSelected}
      />
      {content}
    </>
  );
}

export default MuseumPage;
