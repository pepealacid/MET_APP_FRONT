import { useContext, useState } from "react";

import { Input, Text, Image, Box, Heading, Flex } from "@chakra-ui/react";
import "./itineraries.css";
import Next from "../../assets/images/Next.svg";
import Progress1 from "../../assets/images/Progress1.png";
import { LanguageContext } from "../../context/language.context";

function SetItineraryTime({ setItineraryData, setPage, handleDataChange }) {
  const [allowSend, setAllowSend] = useState({
    hour: false,
    minute: false,
  });
  const [hourMessage, setHourMessage] = useState(null);
  const [minuteMessage, setMinuteMessage] = useState(null);
  const [nextMessage, setNextMessage] = useState(null);

  const { t } = useContext(LanguageContext);

  const [timeValue, setTimeValue] = useState({
    hour: 0,
    minutes: 0,
  });

  const handleHourChange = (event) => {
    if (event.target.value < 1) {
      setHourMessage(
        t?.tours.least || "You need at least one hour for your visit"
      );
      setAllowSend((prevState) => ({
        ...prevState,
        hour: false,
      }));
    } else if (event.target.value > 5) {
      setHourMessage(t?.tours.exceed || "You cannot exceed 5 hours of tour");
      setAllowSend((prevState) => ({
        ...prevState,
        hour: false,
      }));
    } else {
      setHourMessage(null);
      setAllowSend((prevState) => ({
        ...prevState,
        hour: true,
      }));
      setTimeValue((prevState) => ({
        ...prevState,
        hour: event.target.value,
      }));
    }
  };

  const handleMinuteChange = (event) => {
    if (event.target.value < 0) {
      setMinuteMessage(t?.tours.negative || "You cannot have negative minutes");
      setAllowSend((prevState) => ({
        ...prevState,
        minute: false,
      }));
    } else if (event.target.value > 59) {
      setMinuteMessage(
        t?.tours.moreMinutes || "You cannot have more than 59 minutes"
      );
      setAllowSend((prevState) => ({
        ...prevState,
        minute: false,
      }));
    } else {
      setMinuteMessage(null);
      setAllowSend((prevState) => ({
        ...prevState,
        minute: true,
      }));
      setTimeValue((prevState) => ({
        ...prevState,
        minutes: event.target.value,
      }));
    }
  };
  const handleClick = (event) => {
    if (allowSend.hour && allowSend.minute) {
      setItineraryData((prevState) => ({
        ...prevState,
        estimatedTime: [timeValue.hour, timeValue.minutes],
      }));
      setPage("TagSelection");
      handleDataChange("desiredTime", [timeValue.hour, timeValue.minutes]);
    } else {
      setNextMessage(
        t?.tours.allFields || "You need to properly fill all the fields"
      );
    }
  };
  return (
    t?.tours && (
      <form>
        <Box w="100%" h="100vh" bg={`#f5f2f2`}>
          <Box minH="calc(100vh - 100px)">
            <Heading
              ml="18px"
              pt="100px"
              fontSize="25px"
              w="300px"
              color={"#356670"}
            >
              {t?.tours.long || "How long do you have for your visit?"}
            </Heading>
            <Box w="100%" align="center" justify="center" mt={"50px"}>
              <Flex w="260px" h="120">
                <Input
                  bg="white"
                  type="number"
                  onChange={handleHourChange}
                  placeholder={"00"}
                  h="100%"
                  className="custom-input"
                  color=" #356670"
                  fontSize=" 75px"
                  pb=" 50px"
                />

                <Text fontSize="75px" color={"#356670"}>
                  :
                </Text>

                <Input
                  bg="white"
                  type="number"
                  onChange={handleMinuteChange}
                  placeholder={"00"}
                  h="100%"
                  className="custom-input"
                  color=" #356670"
                  fontSize=" 75px"
                  pb=" 50px"
                />
              </Flex>
            </Box>

            <Heading color="orange" ml="50px" as="h6" size="sm" mt="50px">
              {nextMessage} <br />
              {hourMessage} <br />
              {minuteMessage} <br />
            </Heading>
          </Box>

          <Flex h="100px" justify="space-between">
            <Box align="center" justify="center" pt={"50px"} pl="20px">
              <Image src={Progress1} />
            </Box>
            <Image src={Next} p="20px" onClick={handleClick} />
          </Flex>
        </Box>
      </form>
    )
  );
}

export default SetItineraryTime;
