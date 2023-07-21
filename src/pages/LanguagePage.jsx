import React, { useContext, useEffect } from "react";
import { LanguageContext } from "../context/language.context";
import {
  RadioGroup,
  Stack,
  Radio,
  Heading,
  Text,
  Flex,
  Box,
  Image,
  Button,
} from "@chakra-ui/react";

import GoBackButton from "../assets/images/GoBackButton.png";

import { useNavigate } from "react-router-dom";

const LanguagePage = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <>
      <Box marginTop="80px">
        <Heading as="h1" size="lg" mb={2} textAlign="center">
          Language
        </Heading>
        <Text color="gray.600" fontSize="md" mb={4} textAlign="center">
          Select a language
        </Text>
      </Box>
      <Flex direction="column" mt={8} paddingLeft="30px" paddingRight="30px">
        <RadioGroup value={language} onChange={(e) => changeLanguage(e)}>
          <Stack spacing={4}>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">English</Text>
              <Box ml={4}>
                <Radio value="en" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Español</Text>
              <Box ml={4}>
                <Radio value="es" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Deutsch</Text>
              <Box ml={4}>
                <Radio value="de" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Galego</Text>
              <Box ml={4}>
                <Radio value="gl" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Français</Text>
              <Box ml={4}>
                <Radio value="fr" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Gaelic</Text>
              <Box ml={4}>
                <Radio value="gd" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Euskera</Text>
              <Box ml={4}>
                <Radio value="eu" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Italiano</Text>
              <Box ml={4}>
                <Radio value="it" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Català</Text>
              <Box ml={4}>
                <Radio value="ca" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Nederlands</Text>
              <Box ml={4}>
                <Radio value="nl" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Português</Text>
              <Box ml={4}>
                <Radio value="pt" />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              borderBottom="1px solid #efefef"
            >
              <Text paddingBottom="10px">Suomi</Text>
              <Box ml={4}>
                <Radio value="fi" />
              </Box>
            </Flex>
          </Stack>
        </RadioGroup>
      </Flex>
    </>
  );
};

export default LanguagePage;
