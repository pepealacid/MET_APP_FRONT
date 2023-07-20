import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { LanguageContext } from "../context/language.context";

const SupportPage = () => {
  const { t } = useContext(LanguageContext);

  return (
    t?.support && (
      <Box padding="20px">
        <Heading as="h1" size="xl" mb={4}>
          {t?.support.header || "Support"}
        </Heading>
        <Text>
          {t?.support.first ||
            "If you need any assistance or have any questions regarding the Musart app, please don't hesitate to reach out to our support team. We are here to help!"}
        </Text>
        <Box mt={4}>
          <Text fontWeight="bold">
            {" "}
            {t?.support.contactHeader || "Contact Information:"}
          </Text>
          <Text> {t?.support.mail || "Email: angpepeles@gmail.com"}</Text>
          <Text> {t?.support.phone || "Phone: +34 667 63 44 56"}</Text>
        </Box>
        <Box mt={4}>
          <Text fontWeight="bold">
            {" "}
            {t?.support.operating || "Operating Hours:"}
          </Text>
          <Text>
            {" "}
            {t?.support.week || "Monday-Friday: 9:00 AM - 5:00 PM (EST)"}
          </Text>
          <Text> {t?.support.weekend || "Saturday-Sunday: Closed"}</Text>
        </Box>
      </Box>
    )
  );
};

export default SupportPage;
