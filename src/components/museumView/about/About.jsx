import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";
import metData from "../../../data/museumData";
import { useState, useContext } from "react";
import { LenguageContext } from "../../../context/lenguage.context";
import MapIcon1 from "../../../assets/images/MapIcon1.svg";
import Map from "../map/Map";
import Maps from "../../../assets/images/Maps.svg";

function About() {
  const [readMore, setReadMore] = useState(false);

  const { t } = useContext(LenguageContext);

  const handleRead = () => {
    setReadMore(!readMore);
  };

  const isMuseumOpen = () => {
    const newYork = "America/New_York";
    const now = new Date().toLocaleString("en-US", { timeZone: newYork });
    const nowInNY = new Date(now);

    const decimalHour =
      nowInNY.getHours() +
      nowInNY.getMinutes() / 60 +
      nowInNY.getSeconds() / 3600;

    const weekDay = nowInNY.getDay();

    if (
      (weekDay === 1 || weekDay === 2 || weekDay === 4 || weekDay === 7) &&
      decimalHour >= 10 &&
      decimalHour <= 17
    ) {
      return true;
    }

    if (
      (weekDay === 5 || weekDay === 6) &&
      decimalHour >= 10 &&
      decimalHour <= 21
    ) {
      return true;
    }

    return false;
  };

  return (
    t?.museum && (
      <>
        <Box m={6} mt={8} paddingBottom="40px" borderBottom="1px solid #ebebeb">
          <Heading as="h3" size="md" noOfLines={1}>
            {t?.museum.aboutTitle || "About the museum"}
          </Heading>
          <Text mt={10} noOfLines={readMore ? null : 5}>
            {t?.museum.about ||
              "The Metropolitan Museum of Art, commonly known as the Met, is the largest art museum in the Americas, located in New York City. As of 2022, it has welcomed 3,208,832 visitors, ranking it eighth among the most-visited art museums worldwide. In the United States, it is the second-most visited art museum, surpassed only by the National Gallery of Art in Washington D.C. The Met's permanent collection boasts over two million works, which are organized into 17 curatorial departments. Situated on 1000 Fifth Avenue, along the Museum Mile on Manhattan's Upper East Side, the Met's main building is one of the world's largest art museums in terms of area. Its construction began in 1880, and it covers approximately 2 million square feet (190,000 m2). Another location, The Cloisters at Fort Tryon Park in Upper Manhattan, houses a vast collection of art, architecture, and artifacts from medieval Europe. The establishment of the Metropolitan Museum of Art dates back to 1870, with a mission to bring art and art education to the American people. Its permanent collection encompasses various art forms, including classical antiquity, ancient Egypt, European Old Masters' paintings and sculptures, American and modern art. Moreover, the Met holds extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum also showcases encyclopedic collections of musical instruments, costumes, accessories, and antique weapons and armor from around the world. Notably, the galleries feature remarkable interiors spanning from 1st-century Rome to modern American design."}
          </Text>
          <Grid templateColumns="repeat(3, 1fr)">
            <GridItem>
              <button onClick={handleRead}>
                <Text as="u" textAlign="left">
                  {readMore ? "Read Less" : "Read More"}
                </Text>
              </button>
            </GridItem>
          </Grid>
          <Button
            bg="black"
            onClick={() => {
              window.open(
                "https://maps.metmuseum.org/?screenmode=base&floor=1#hash=17/40.779448/-73.963517/-61",
                "_blank"
              );
            }}
          >
            <Image src={MapIcon1} alt="map" />
            <Text color="white">{t?.seeMap || "See map"}</Text>
          </Button>
        </Box>
        <Box m={6} mt={8} paddingBottom="40px" borderBottom="1px solid #ebebeb">
          <Heading as="h3" size="md" noOfLines={1}>
            {t?.museum.schedules || "Schedules"}
          </Heading>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Text>Monday</Text>
              <Text>Tuesday</Text>
              <Text>Wednesday</Text>
              <Text>Thuersday</Text>
              <Text>Friday</Text>
              <Text>Saturday</Text>
              <Text>Sunday</Text>
            </Box>
            <Box textAlign="right">
              <Text>10AM - 5PM</Text>
              <Text>10AM - 5PM</Text>
              <Text>{t?.museum.closed || "CLOSED"}</Text>
              <Text>10AM - 5PM</Text>
              <Text>10AM - 9PM</Text>
              <Text>10AM - 9PM</Text>
              <Text>10AM - 5PM</Text>
            </Box>
          </Box>
          <Box marginTop="20px">
            {" "}
            {isMuseumOpen() ? (
              <Text color="green">OPEN NOW</Text>
            ) : (
              <Text color="red">CLOSED NOW</Text>
            )}
          </Box>
        </Box>
        <Box>
          <Heading>{t?.museum.find || "Where to find it"}</Heading>
          <Map />
          <Flex justifyContent="center" marginTop="20px">
            <Button
              marginTop="20px"
              width="380px"
              bg="black"
              onClick={() => {
                window.open("https://goo.gl/maps/Q69cfUuJ2ikQsxYg7", "_blank");
              }}
            >
              <Image src={Maps} />
              <Text color="white">{t?.museum.maps || "Open in Maps"}</Text>
            </Button>
          </Flex>
        </Box>
      </>
    )
  );
}

export default About;
