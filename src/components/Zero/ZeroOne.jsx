import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import BackgroundOne from "../../assets/images/BackgroundOne.png";
import ProgressOne from "../../assets/images/Progress1.png";
import Next from "../../assets/images/Next.png";

const ZeroOne = ({ setCounter }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleSkip = async () => {
    setCounter(4);
  };

  return (
    <Box overflow="hidden">
      <Box position="relative">
        <Image width="100%" src={BackgroundOne} alt="" />
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
          Don't miss a thing!
        </Text>
        <Text fontSize="20px">
          Choose any of the pre-defined tours or customize your own to see it
          all.
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
        <Image src={ProgressOne} alt="First page" />
        <Button left="80px" backgroundColor="transparent" onClick={handleClick}>
          <Image src={Next} alt="Next page" />
        </Button>
      </Box>
    </Box>
  );
};

export default ZeroOne;
