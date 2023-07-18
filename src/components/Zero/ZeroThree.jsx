import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import BackgroundThree from "../../assets/images/BackgroundThree.png";
import ProgressThree from "../../assets/images/Progress3.png";
import Next from "../../assets/images/Next.png";

const ZeroThree = ({ setCounter }) => {
  const handleClick = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleSkip = () => {
    setCounter(4);
  };

  return (
    <Box overflow="hidden">
      <Box position="relative">
        <Image width="100%" src={BackgroundThree} alt="" />
        <Button
          backgroundColor="transparent"
          position="absolute"
          top="30px"
          left="150px"
          onClick={handleSkip}
        >
          <Text decoration="underline" color="white">
            Skip
          </Text>
        </Button>
      </Box>
      <Box paddingTop="50px" paddingLeft="20px" width="320px">
        <Text fontWeight="bold" fontSize="26px" marginBottom="10px">
          Add everything you like to your favourites
        </Text>
        <Text fontSize="20px">
          Our algorithm ensures that nothing you like goes unnoticed.
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
        <Image src={ProgressThree} alt="First page" />
        <Button left="80px" backgroundColor="transparent" onClick={handleClick}>
          <Image src={Next} alt="Next page" />
        </Button>
      </Box>
    </Box>
  );
};

export default ZeroThree;
