import {
  Box,
  Flex,
  Spacer,
  Grid,
  Image,
  GridItem,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import "./buttonPicker.css";
import { useContext } from "react";
import { LanguageContext } from "../../../context/language.context";

function ButtonPicker({ options, selected, setSelected }) {
  const handleChange = (option) => {
    setSelected(option);
  };

  const { t } = useContext(LanguageContext);

  return (
    t?.buttons && (
      <Grid templateColumns="repeat(4, 1fr)" m={4} mt={4} gap={1}>
        {options.map((option) => (
          <GridItem w="100%" key={option}>
            <button
              className={option === selected ? "pressed" : "non-pressed"}
              onClick={() => {
                handleChange(option);
              }}
            >
              {t?.buttons[option] || option}
            </button>
          </GridItem>
        ))}
      </Grid>
    )
  );
}

export default ButtonPicker;
