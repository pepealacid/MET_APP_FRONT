import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

const SupportPage = () => {
  return (
    <Box padding="20px">
      <Heading as="h1" size="xl" mb={4}>
        Support
      </Heading>
      <Text>
        If you need any assistance or have any questions regarding the Musart
        app, please don't hesitate to reach out to our support team. We are
        here to help!
      </Text>
      <Box mt={4}>
        <Text fontWeight="bold">Contact Information:</Text>
        <Text>Email: angpepeles@gmail.com</Text>
        <Text>Phone: +34 667 63 44 56</Text>
      </Box>
      <Box mt={4}>
        <Text fontWeight="bold">Operating Hours:</Text>
        <Text>Monday-Friday: 9:00 AM - 5:00 PM (EST)</Text>
        <Text>Saturday-Sunday: Closed</Text>
      </Box>
    </Box>
  );
};

export default SupportPage;
