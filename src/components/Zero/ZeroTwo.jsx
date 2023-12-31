import React, { useContext } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import BackgroundTwo from "../../assets/images/BackgroundTwo.png";
import ProgressTwo from "../../assets/images/Progress2.png";
import Next from "../../assets/images/Next.svg";
import { LanguageContext } from "../../context/language.context";

const ZeroTwo = ({ setCounter }) => {
  const handleClick = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleSkip = async () => {
    setCounter(4);
  };

  const { t } = useContext(LanguageContext);

  return t?.zero.two && (
    <Box overflow="hidden">
      <Box position="relative">
        <Image width="100%" src={BackgroundTwo} alt="" />
        <Button
          backgroundColor="transparent"
          position="absolute"
          top="30px"
          left="150px"
          onClick={handleSkip}
        >
          <Text decoration="underline" color="white">
            {t?.zero.skip || "Skip"}
          </Text>
        </Button>
      </Box>
      <Box paddingTop="50px" paddingLeft="20px" width="320px">
        <Text fontWeight="bold" fontSize="26px" marginBottom="10px">
          {t?.zero.two.header || "Get all the info with just one scan"}
        </Text>
        <Text fontSize="20px">
          {t?.zero.two.text || "Scan any work of art to see the whole story behind it."}
        </Text>
      </Box>
      <Box
        position="fixed"
        bottom="10px"
        left="0"
        right="0"
        p="4"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image src={ProgressTwo} alt="First page" />
        <Button left="80px" backgroundColor="transparent" onClick={handleClick}>
          <Image src={Next} alt="Next page" />
        </Button>
      </Box>
    </Box>
  );
};

export default ZeroTwo;
