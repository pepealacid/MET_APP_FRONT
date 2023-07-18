import { useContext } from "react";
import { Flex, Button, Image, Text } from "@chakra-ui/react";
import Favorites from "../assets/images/Favorites.png";
import Explore from "../assets/images/Explore.png";
import Scan from "../assets/images/Scan.png";
import Profile from "../assets/images/Profile.png";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button as PopoverButton,
} from "@chakra-ui/react";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  return (
    <Flex
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      justify="center"
      p={4}
      bg="white"
      height="100px"
      zIndex={9999}
      alignItems="center"
    >
      <Button
        onClick={() => navigate("/explore")}
        mr={4}
        colorScheme="teal"
        variant="ghost"
      >
        <Flex direction="column" alignItems="center">
          <Image src={Explore} alt="Explore" />
          <Text mt={2}>Explore</Text>
        </Flex>
      </Button>
      <Button
        onClick={() => navigate("/scan")}
        mr={4}
        colorScheme="teal"
        variant="ghost"
      >
        <Flex direction="column" alignItems="center">
          <Image src={Scan} alt="Scan" />
          <Text mt={2}>Scan</Text>
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
          <Text mt={2}>Favorites</Text>
        </Flex>
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button mr={4} colorScheme="teal" variant="ghost">
            <Flex direction="column" alignItems="center">
              <Image src={Profile} alt="Profile" />
              <Text mt={2}>Profile</Text>
            </Flex>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <PopoverButton
              onClick={() => {logout()}}
              colorScheme="red"
              variant="outline"
              width="100%"
              textAlign="center"
            >
              Logout
            </PopoverButton>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Navbar;
