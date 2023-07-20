import React, { useContext } from "react";
import { LanguageContext } from "../context/language.context";
import { Button, Flex, Heading, useColorMode, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ThemePage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const { t } = useContext(LanguageContext);

  return (
    t?.themePage && (
      <>
        <Heading marginTop="70px" marginLeft="50px" as="h1" size="lg" mb={4}>
          {t?.themePage.header || "Theme"}
        </Heading>
        <Flex direction="column" alignItems="center" mt={8}>
          <Flex>
            <Button
              colorScheme={isDarkMode ? "teal" : "dark"}
              bg={isDarkMode ? "darkgray" : "black"}
              color={isDarkMode ? "white" : "white"}
              onClick={toggleColorMode}
              ml={2}
              width="160px"
              borderTopRightRadius="0px"
              borderBottomRightRadius="0px"
            >
              {t?.themePage.light || "Light"}
            </Button>
            <Button
              colorScheme={isDarkMode ? "teal" : "gray"}
              bg={isDarkMode ? "white" : "#efefef"}
              color={isDarkMode ? "black" : "gray.800"}
              onClick={toggleColorMode}
              ml={2}
              marginLeft="0px"
              width="160px"
              borderTopLeftRadius="0px"
              borderBottomLeftRadius="0px"
            >
              {t?.themePage.dark || "Dark"}
            </Button>
          </Flex>
        </Flex>
      </>
    )
  );
};

export default ThemePage;
