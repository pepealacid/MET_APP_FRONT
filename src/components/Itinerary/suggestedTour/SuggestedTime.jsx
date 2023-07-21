import turnIntoNumber from "../../../utils/stringToNumber";
import { convertToHoursAndMinutes } from "../../../utils/functions";
import graph from "../../../utils/mapGraph";
import { useContext, useEffect, useState } from "react";
import { Box, Heading, Spinner, Text, Flex } from "@chakra-ui/react";
import { LanguageContext } from "../../../context/language.context";

function SuggestedTime({
  galleries,
  pieces,
  handleDataChange,
  artData,
  time,
  setTime,
}) {
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    findPath();
  }, [galleries, pieces, time]);

  const findPath = () => {
    const vertices = galleries.map((name) => turnIntoNumber(name));
    const shortestPath = graph.findShortestPath(vertices);
    console.log("shortest path", shortestPath);
    shortestPath ? setTime(shortestPath.length * 2 + pieces.length * 3) : null;
    saveData(shortestPath);
  };

  const saveData = (path) => {
    handleDataChange("path", path);
    handleDataChange("calculatedTime", time);
    handleDataChange("artworkData", artData);
    handleDataChange("galleriesId", galleries);
    handleDataChange("artworkId", pieces);
    handleDataChange("name", `${t?.tours.personalized || "Personalized tour"}`);
    handleDataChange("picture", artData[0]?.primaryImage);
  };

  return (
    t?.tours && (
      <>
        <Box>
          {time ? (
            <Box p="20px" pt="65px" pl="40px">
              <Heading color="#356670">
                {t?.tours.tourTime || "Tour Time"}{" "}
                {convertToHoursAndMinutes(time)}
              </Heading>
              <Text lineHeight="17px" w="320px" color="#7E8484">
                {t?.tours.can ||
                  "You can add, delete the artworks here. We will notify you if your changes exceed the time of the tour."}
              </Text>
            </Box>
          ) : (
            <Box w="100%" h="100vh" bg={`#f5f2f2`}>
              <Flex>
                <Heading p="30px" w="300px">
                  {t?.tours.creating || "We are creating the perfect tour for you ..."}
                </Heading>
                <Box m="35px">
                  <Spinner
                    justify="center"
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="orange"
                    size="xl"
                  />
                </Box>
              </Flex>
            </Box>
          )}
        </Box>
      </>
    )
  );
}

export default SuggestedTime;
