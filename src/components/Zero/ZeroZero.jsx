import React, { useEffect, useState } from "react";
import { Image, Box } from "@chakra-ui/react";
import Background from "../../assets/images/ZeroBackbround.png";
import Logo from "../../assets/images/ZeroLogo.png";
import { TOKEN_NAME } from "../../context/auth.context";
import userService from "../../services/user.service";

const ZeroZero = ({ setCounter }) => {
  const [isFirstTime, setIsFirstTime] = useState("false");

  useEffect(() => {
    const fetchData = async () => {
      const firstTime = await getFirstTime();
      setIsFirstTime(firstTime);
      console.log(firstTime);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFirstTime) {
        setCounter(1);
      } else {
        setCounter(4);
      }
    }, 3000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [isFirstTime]);

  const getFirstTime = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const user = await userService.getUser(token);
      const userId = user.data._id;
      const firstTime = await userService.getFirstTime(userId);
      return firstTime;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box position="relative" height="100vh">
      <Image
        src={Background}
        alt=""
        objectFit="cover"
        width="100%"
        height="100%"
        zIndex={-1}
      />
      <Image
        src={Logo}
        alt="Musart"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
    </Box>
  );
};

export default ZeroZero;
