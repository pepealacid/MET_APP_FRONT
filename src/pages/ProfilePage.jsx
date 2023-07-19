import React, { useEffect, useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import userService from "../services/user.service";
import DefaultUser from "../assets/images/DefaultUser.svg";
import { TOKEN_NAME } from "../context/auth.context";

const ProfilePage = () => {
  const [user, setUser] = useState({
    image: DefaultUser,
    username: "",
    email: "",
    description: "",
  });

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const response = await userService.getUser(token);
      const userData = response.data;
      setUser({
        image: userData.image || DefaultUser,
        username: userData.username,
        email: userData.email,
        description: userData.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={4}
      border="none"
    >
      <Image src={user.image} alt="Profile" />
      <Box mt={4}>
        <Text fontSize="xl" fontWeight="bold">
          {user.username}
        </Text>
        <Text>Email: {user.email}</Text>
        {user.description && user.description !== "" && (
          <Text>Description: {user.description}</Text>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
