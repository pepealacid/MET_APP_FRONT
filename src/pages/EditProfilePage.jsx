import { useEffect, useState, useRef } from "react";
import { TOKEN_NAME } from "../context/auth.context";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Image,
} from "@chakra-ui/react";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import DefaultUser from "../assets/images/DefaultUser.svg";
import UploadPicture from "../assets/images/UploadPicture.svg";

const EditProfilePage = () => {
  const [userInfo, setUserInfo] = useState(undefined);
  const [loadingImage, setLoadingImage] = useState(false);


  const [data, setData] = useState({
    username: "",
    email: "",
    description: "",
    image: ""
  });

  const userImage = data.image;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

  const uploadImage = (e) => {
    setLoadingImage(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    uploadService.uploadImage(uploadData).then(({ data }) => {
      setLoadingImage(false);
      setPostStatus({ ...postStatus, image: data.cloudinary_url });
    });
  };

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
    <>
      <Box
        flexBasis="100%"
        display="flex"
        justifyContent="center"
        mb={2}
        paddingTop="100px"
      >
        <Image
          objectFit="cover"
          borderRadius="100%"
          height="100px"
          width="100px"
          src={userImage || DefaultUser}
          alt="user"
        />

        <Box position="absolute" top="170px" left="220px">
          <label htmlFor="file-upload">
            <Image
              src={UploadPicture}
              size={24}
              cursor="pointer"
              color="teal"
            />
          </label>
        </Box>
      </Box>

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

        <Input
          type="file"
          id="file-upload"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={uploadImage}
        />

        <Button mt={4} bg="black" color="white" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default EditProfilePage;
