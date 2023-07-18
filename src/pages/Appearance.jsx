import React from "react";
import { Heading, Flex, Button, useColorMode } from "@chakra-ui/react";

const AppearancePage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading mb={4} size="lg">
        Select App Theme
      </Heading>
      <Button
        onClick={toggleColorMode}
        colorScheme={isDarkMode ? "teal" : "gray"}
        variant="outline"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </Button>
    </Flex>
  );
};

export default AppearancePage;
