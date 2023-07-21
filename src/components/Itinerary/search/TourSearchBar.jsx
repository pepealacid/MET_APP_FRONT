import { useContext, useState } from "react";
import {
  Input,
  Box,
  Center,
  InputGroup,
  InputLeftElement,
  Image,
} from "@chakra-ui/react";
import "../../../main.css";
import Magnifier from "../../../assets/images/Magnifier.svg";
import { LanguageContext } from "../../../context/language.context";

function TourSearchBar({ setQuery, decideResults }) {
  const [value, setValue] = useState("");

  const { t } = useContext(LanguageContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setQuery(value);
    decideResults(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    t?.main && (
      <>
        <Box position="relative">
          <form onSubmit={handleSubmit}>
            <Box position="relative" marginTop="2rem" marginBottom="2rem">
              <Center>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Image
                      src={Magnifier}
                      alt="Search"
                      boxSize="25px"
                      marginLeft="46px"
                    />
                  </InputLeftElement>
                  <Input
                    placeholder={t?.main.searchTour || "Search for tours"}
                    className="search-bar"
                    size="md"
                    w="90%"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Center>
            </Box>
          </form>
        </Box>
      </>
    )
  );
}

export default TourSearchBar;
