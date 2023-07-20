import { useEffect, useState, useRef, useContext } from "react";
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
import uploadService from "../services/upload.service";
import { LanguageContext } from "../context/language.context";

const EditProfilePage = () => {
  const [userInfo, setUserInfo] = useState(undefined);
  const [loadingImage, setLoadingImage] = useState(false);
  const [userId, setUserId] = useState();

  const { t } = useContext(LanguageContext);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    description: "",
    image: "",
  });

  const userImage = userData.image;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const user = await userService.getUser(token);
      const userData = user.data;
      setUserInfo(userData);
      setUserId(userData._id);
      if (userData) {
        setUserData({
          username: userData.username,
          email: userData.email,
          description: userData.description,
          image: userData.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = (e) => {
    setLoadingImage(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    uploadService.uploadImage(uploadData).then(({ data }) => {
      setLoadingImage(false);
      setUserData({ ...userData, image: data.cloudinary_url });
      console.log(data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("-.-.-.-.", userData);
      await userService.edit(userId, userData);
      navigate("/home/artworks");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    t?.editProfile && (
      <>
        <form onSubmit={handleSubmit}>
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
              <FormLabel>{t?.editProfile.name || "Name"}</FormLabel>
              <Input
                placeholder="Enter your name"
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>{t?.editProfile.email || "Email"}</FormLabel>
              <Input
                placeholder="Enter your email"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                {t?.editProfile.description || "Description"}
              </FormLabel>
              <Textarea
                placeholder="Enter a description"
                type="text"
                name="description"
                value={userData.description}
                onChange={handleChange}
              />
            </FormControl>

            <Input
              type="file"
              id="file-upload"
              name="image"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={uploadImage}
            />

            <Button type="submit" mt={4} bg="black" color="white">
              {t?.editProfile.save || "Save"}
            </Button>
          </Box>
        </form>
      </>
    )
  );
};

export default EditProfilePage;
