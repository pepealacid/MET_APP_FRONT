import { Button, Flex } from "@chakra-ui/react";
import { LanguageContext } from "../../../context/language.context";
import { useContext } from "react";

const Tickets = () => {

  const { t } = useContext(LanguageContext)

  const handleClick = () => {
    window.open(
      "https://engage.metmuseum.org/admission/?promocode=52349&_gl=1*w68dst*_ga*MTk4OTQ2OTE2NC4xNjg5ODE2MDYz*_ga_Y0W8DGNBTB*MTY4OTgxNjA2Mi4xLjAuMTY4OTgxNjA2Mi4wLjAuMA..",
      "_blank"
    );
  };

  return t?.buttons && (
    <Flex justifyContent="center" marginTop="20px">
      <Button width="380px" bg="black" color="white" onClick={handleClick}>
        {t?.buttons.ticketsButton || "Buy tickets"}
      </Button>
    </Flex>
  );
};

export default Tickets;
