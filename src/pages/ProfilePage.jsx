import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Box,
  Button,
  Wrap,
  WrapItem,
  Center,
  Grid,
  Divider,
  ButtonGroup,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Image, Text } from "@chakra-ui/react";
import NextProfile from "../assets/images/NextProfile.png";
import Key from "../assets/images/Key.png";
import Translate from "../assets/images/Translate.png";
import Appearance from "../assets/images/Appearance.png";
import Support from "../assets/images/Support.png";
import Legal from "../assets/images/Legal.png";
import Logout from "../assets/images/Logout.png";
import Delete from "../assets/images/Delete.png";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { TOKEN_NAME } from "../context/auth.context";
import { AuthContext } from "../context/auth.context";
import { LenguageContext } from "../context/lenguage.context";
import DefaultUser from "../assets/images/DefaultUser.svg"

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    image: "",
    id: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const { t } = useContext(LenguageContext);

  const navigate = useNavigate();

  useEffect(() => {
    handleUserInfo();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const user = await userService.getUser(token);
      const userId = user.data._id;

      await userService.deleteUser(userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserInfo = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      console.log("HANDLE", token);
      const user = await userService.getUser(token);
      const userData = user.data;
      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };
  const { logout } = useContext(AuthContext);

  return (
    t?.navbar && (
      <Box>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
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
              src={userData.image || DefaultUser}
              alt="user"
            />
          </Box>
          <Box flexBasis="100%" display="flex" justifyContent="center" mb={2}>
            <Text>{userData.username}</Text>
          </Box>
          <Box flexBasis="100%" display="flex" justifyContent="center">
            <Button
              marginBottom="40px"
              w="120px"
              color="white"
              bg="black"
              onClick={() => {
                navigate("/edit-profile");
              }}
            >
              {t?.navbar.edit || "Edit"}
            </Button>
          </Box>
        </Box>

        <Box>
          <ButtonGroup>
            <Wrap direction="column">
              <WrapItem>
                <Center>
                  <Button
                    bg="transparent"
                    as="div"
                    display="inline-block"
                    onClick={() => {
                      navigate("/change-password");
                    }}
                  >
                    <Grid templateColumns="1fr 10fr 1fr" alignItems="center">
                      <Box gridColumn="1">
                        <Image src={Key} alt="" />
                      </Box>
                      <Box gridColumn="2" textAlign="center">
                        <Text textAlign="left" marginLeft="10px">
                          {t?.navbar.changePassword || "Change your password"}
                        </Text>
                      </Box>
                      <Box gridColumn="3" textAlign="center">
                        <Image src={NextProfile} alt="" />
                      </Box>
                    </Grid>
                  </Button>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Button
                    bg="transparent"
                    as="div"
                    display="inline-block"
                    onClick={() => {
                      navigate("/lenguage");
                    }}
                  >
                    <Grid templateColumns="1fr 10fr 1fr" alignItems="center">
                      <Box gridColumn="1">
                        <Image src={Translate} alt="" />
                      </Box>
                      <Box gridColumn="2" textAlign="center">
                        <Text textAlign="left" marginLeft="14px">
                          {t?.navbar.language || "Language"}
                        </Text>
                      </Box>
                      <Box gridColumn="3" textAlign="center">
                        <Image
                          marginLeft="9.5px"
                          src={NextProfile}
                          alt=""
                          paddingLeft="0.4px"
                        />
                      </Box>
                    </Grid>
                  </Button>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Button
                    bg="transparent"
                    as="div"
                    display="inline-block"
                    onClick={() => {
                      navigate("/appearance");
                    }}
                  >
                    <Grid templateColumns="1fr 10fr 1fr" alignItems="center">
                      <Box gridColumn="1">
                        <Image src={Appearance} alt="" />
                      </Box>
                      <Box gridColumn="2" textAlign="center">
                        <Text textAlign="left" marginLeft="10px">
                          {t?.navbar.appearance || "Appearance"}
                        </Text>
                      </Box>
                      <Box gridColumn="3" textAlign="center">
                        <Image src={NextProfile} alt="" />
                      </Box>
                    </Grid>
                  </Button>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Button
                    bg="transparent"
                    as="div"
                    display="inline-block"
                    onClick={() => {
                      navigate("/support");
                    }}
                  >
                    <Grid templateColumns="1fr 10fr 1fr" alignItems="center">
                      <Box gridColumn="1">
                        <Image src={Support} alt="" />
                      </Box>
                      <Box gridColumn="2" textAlign="center">
                        <Text textAlign="left" marginLeft="10px">
                          {t?.navbar.support || "Support"}
                        </Text>
                      </Box>
                      <Box gridColumn="3" textAlign="center">
                        <Image src={NextProfile} alt="" />
                      </Box>
                    </Grid>
                  </Button>
                </Center>
              </WrapItem>

              <WrapItem>
                <Center>
                  <Button
                    bg="transparent"
                    as="div"
                    display="inline-block"
                    onClick={() => {
                      navigate("/legal");
                    }}
                  >
                    <Grid templateColumns="1fr 10fr 1fr" alignItems="center">
                      <Box gridColumn="1">
                        <Image src={Legal} alt="" />
                      </Box>
                      <Box gridColumn="2" textAlign="center">
                        <Text textAlign="left" marginLeft="10px">
                          {t?.navbar.legal || "Legal"}
                        </Text>
                      </Box>
                      <Box gridColumn="3" textAlign="center">
                        <Image src={NextProfile} alt="" />
                      </Box>
                    </Grid>
                  </Button>
                </Center>
              </WrapItem>

              <Divider />

              <WrapItem>
                <Center>
                  <Button
                    onClick={() => {
                      logout();
                    }}
                    bg="transparent"
                    as="div"
                    display="inline-block"
                  >
                    <Grid templateColumns="1fr 10fr 1fr" alignItems="center">
                      <Box gridColumn="1">
                        <Image src={Logout} alt="" />
                      </Box>
                      <Box gridColumn="2" textAlign="center">
                        <Text textAlign="left" marginLeft="10px">
                          {t?.navbar.logout || "Logout"}
                        </Text>
                      </Box>
                      <Box gridColumn="3" textAlign="center">
                        <Image src={NextProfile} alt="" />
                      </Box>
                    </Grid>
                  </Button>
                </Center>
              </WrapItem>

              <WrapItem marginBottom="60px">
                <Center>
                  <Button
                    bg="transparent"
                    as="div"
                    display="inline-block"
                    onClick={() => setIsOpen(true)}
                  >
                    <Grid templateColumns="1fr 10fr 1fr" alignItems="center">
                      <Box gridColumn="1">
                        <Image src={Delete} alt="" />
                      </Box>
                      <Box gridColumn="2" textAlign="center">
                        <Text color="red" textAlign="left" marginLeft="10px">
                          {t?.navbar.deleteAccount || "Delete account"}
                        </Text>
                      </Box>
                      <Box gridColumn="3" textAlign="center">
                        <Image src={NextProfile} alt="" />
                      </Box>
                    </Grid>
                  </Button>
                </Center>
              </WrapItem>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      {t?.navbar.deleteAccount || "Delete account"}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      {t?.navbar.deleteConfirmation ||
                        "Are you sure you want to delete your account? This action is irreversible."}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        {t?.navbar.cancel || "Cancel"}
                      </Button>
                      <Button colorScheme="red" onClick={handleDelete} ml={3}>
                        {t?.navbar.delete || "Delete"}
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Wrap>
          </ButtonGroup>
        </Box>
      </Box>
    )
  );
};

export default ProfilePage;
