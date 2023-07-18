import { useEffect, useState } from "react";
import { TOKEN_NAME } from "../context/auth.context";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const [userInfo, setUserInfo] = useState(undefined);
  const [data, setData] = useState({
    username: "",
    email: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const user = await userService.getUser(token);
      const userData = user.data;
      setUserInfo(userData);
      if (userData) {
        setData({
          username: userData.username,
          email: userData.email,
          description: userData.description,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.edit(userInfo._id, data);
      navigate("/my-profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maxW="sm" mx="auto">
      <FormControl mt={4}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Enter a description"
          type="text"
          name="description"
          value={data.description}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" onChange={handleFileChange} />
      </FormControl>

      <Button mt={4} bg="black" color="white" onClick={handleSubmit}>
        Save
      </Button>
    </Box>
  );
};

export default EditProfilePage;
