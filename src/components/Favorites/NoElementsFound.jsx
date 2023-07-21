import { Box, Image, Heading, Text, Flex } from "@chakra-ui/react";
import noHeart from "../../assets/images/noHeart.svg";
import { useNavigate, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/language.context";

function NoElementsFound({ field, exploreIn }) {
  const navigate = useNavigate();

  const goExplore = () => {
    navigate(exploreIn);
  };


  const { t } = useContext(LanguageContext);

  const translatedFavorites = t?.tours.noFavorites
    ? t?.tours.noFavorites.replace("{{field}}", field)
    : `You have no favorite ${field}`;
  const translatedMark = t?.tours.mark
    ? t?.tours.mark.replace("{{field}}", field)
    : `All the ${field} you mark as favorite will appear here`;
  return (
    t?.tours && (
      <>
        <Flex
          w="vw"
          h="vh"
          mt={"70px"}
          align="center"
          justify="center"
          direction="column"
          mb={"200px"}
        >
          <Image src={noHeart} w={"50px"} pb={"5px"} />

          <Heading as="h4" size="md" w={"200px"} textAlign="center" pb={"5px"}>
            {translatedFavorites || `You have no favorite ${field}`}
          </Heading>

          <Text pb={"5px"} w={"250px"} textAlign="center" mt="10px">
            {translatedMark || `All the ${field} you mark as favorite will appear here`}
          </Text>

          <Box
            bg={"black"}
            color="white"
            w={"234px"}
            borderRadius={"6px"}
            height={"45px"}
            pt="9px"
            mt="20px"
            onClick={goExplore}
          >
            <Heading size="md" textAlign="center">
              {t?.tours.explore || "Go Explore!"}
            </Heading>
          </Box>
        </Flex>
      </>
    )
  );
}

export default NoElementsFound;
