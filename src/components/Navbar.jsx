import { useContext, useState, useEffect } from "react";
import { Flex, Button, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { TOKEN_NAME } from "../context/auth.context";
import Favorites from "../assets/images/Favorites.png";
import Explore from "../assets/images/Explore.png";
import Profile from "../assets/images/Profile.png";
import { useNavigate, useLocation } from "react-router-dom";
import userService from "../services/user.service";
import { LanguageContext } from "../context/language.context";

const Navbar = () => {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const { t } = useContext(LanguageContext);

  const location = useLocation();

  const bg = useColorModeValue("white", "gray.800");

  const handleUserInfo = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const user = await userService.getUser(token);
      const userData = user.data;
      setUserImage(userData.image);
      setUserName(userData.username);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackClick = () => {
    if (location.pathname === "/profile") {
      navigate(-1);
    } else {
      navigate("/profile");
    }
  };

  useEffect(() => {
    handleUserInfo();
  }, [location]);

  return (
    t?.navbar && (
      <Flex
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        justify="center"
        p={4}
        height="100px"
        zIndex={9999}
        alignItems="center"
        bg={bg}
      >
        <Button
          onClick={() => navigate("/home/artworks")}
          mr={4}
          colorScheme="teal"
          variant="ghost"
        >
          <Flex direction="column" alignItems="center">
            <Image src={Explore} alt="Explore" />
            <Text mt={2}>{t?.navbar.explore || "Explore"}</Text>
          </Flex>
        </Button>
        <Button
          onClick={() => navigate("/favorites")}
          mr={4}
          colorScheme="teal"
          variant="ghost"
        >
          <Flex direction="column" alignItems="center">
            <Image src={Favorites} alt="Favorites" />
            <Text mt={2}>{t?.navbar.favorites}</Text>
          </Flex>
        </Button>

        <Button
          onClick={handleBackClick}
          mr={4}
          colorScheme="teal"
          variant="ghost"
        >
          <Flex direction="column" alignItems="center">
            <Image src={Profile} alt="Favorites" />
            <Text mt={2}>{t?.navbar.profile}</Text>
          </Flex>
        </Button>
      </Flex>
    )
  );
};

export default Navbar;
