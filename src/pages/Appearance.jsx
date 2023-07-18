import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

const AppearancePage = () => {
  return (
    <Box>
     <Text fontWeight="bold" padding="20px">
        Actually, we don't have this functionality available yet. Please be
        patient as we continue to improve the Musart app. Stay tuned for future
        updates!
      </Text>
      <Box width="100%" height="0" padding="50% 0 0 0" position="relative">
        <iframe
          src="https://giphy.com/embed/YBx0EusfRbWXdsNls5"
          width="100%"
          height="100%"
          style={{ position: "absolute" }}
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
          title="Painter GIF"
        ></iframe>
      </Box>
     
    </Box>
  );
};

export default AppearancePage;
