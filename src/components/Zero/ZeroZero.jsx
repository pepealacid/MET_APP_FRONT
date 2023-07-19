import React, { useEffect, useState } from "react";
import { Image, Box } from "@chakra-ui/react";
import Background from "../../assets/images/ZeroBackbround.png";
import Logo from "../../assets/images/ZeroLogo.png";
import { TOKEN_NAME } from "../../context/auth.context";
import userService from "../../services/user.service";

const ZeroZero = ({ setCounter }) => {
  const [isFirstTime, setIsFirstTime] = useState("false");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(1);
    }, 3000);

    return () => {
      clearTimeout(timer); // Clear the timeout when the component unmounts or when the effect re-runs
    };
  }, []);


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
