import { useContext, useState, useRef, useEffect } from "react";
import {
  Flex,
  Button,
  Image,
  Text,
  Box,
  ButtonGroup,
  WrapItem,
  Wrap,
  Center,
  Grid,
  Divider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import { TOKEN_NAME } from "../context/auth.context";
import Favorites from "../assets/images/Favorites.png";
import Explore from "../assets/images/Explore.png";
import Scan from "../assets/images/Scan.png";
import Profile from "../assets/images/Profile.png";
import { useNavigate, useLocation } from "react-router-dom";
import Time from "../assets/images/Time.png";
import ScanStory from "../assets/images/ScanStory.png";
import Legal from "../assets/images/Legal.png";
import Logout from "../assets/images/Logout.png";
import Key from "../assets/images/Key.png";
import NextProfile from "../assets/images/NextProfile.png";
import Translate from "../assets/images/Translate.png";
import Appearance from "../assets/images/Appearance.png";
import Support from "../assets/images/Support.png";
import Delete from "../assets/images/Delete.png";
import userService from "../services/user.service";
import DefaultUser from "../assets/images/DefaultUser.svg";

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
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");

  const onWindowClose = () => setIsWindowOpen(false);
  const cancelRef = useRef();
  const location = useLocation();

  const bg = useColorModeValue("white", "gray.800");

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

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
      const user = await userService.getUser(token);
      const userData = user.data;
      setUserImage(userData.image);
      setUserName(userData.username);
    } catch (error) {
      console.log(error);
    }
  };
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    handleUserInfo();
  }, [location]);

  return (
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
      <Popover
        isOpen={isPopoverOpen}
        onOpen={handlePopoverOpen}
        onClose={handlePopoverClose}
      >
        <PopoverTrigger>
          <Button mr={4} colorScheme="teal" variant="ghost">
            <Flex direction="column" alignItems="center">
              <Image src={Profile} alt="Profile" />
              <Text mt={2}>Profile</Text>
            </Flex>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100vw"
          maxWidth="100%"
          padding={4}
          bg="white"
          border="none"
        >
          <PopoverBody bg={bg}>
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
                    src={userImage || DefaultUser}
                    alt="user"
                  />
                </Box>
                <Box
                  flexBasis="100%"
                  display="flex"
                  justifyContent="center"
                  mb={2}
                >
                  <Text>{userName}</Text>
                </Box>
                <Box flexBasis="100%" display="flex" justifyContent="center">
                  <Button
                    marginBottom="40px"
                    w="120px"
                    color="white"
                    bg="black"
                    onClick={() => {
                      navigate("/edit-profile");
                      handlePopoverClose();
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>

              <Box>
                <ButtonGroup>
                  <Wrap direction="column">
                    <Center>
                      <Button bg="transparent" as="div" display="inline-block">
                        <Grid
                          templateColumns="1fr 10fr 1fr"
                          alignItems="center"
                        >
                          <Box gridColumn="1">
                            <Image src={Time} alt="" />
                          </Box>
                          <Box gridColumn="2" textAlign="center">
                            <Text textAlign="left" marginLeft="10px">
                              Tour Time preferences
                            </Text>
                          </Box>
                          <Box gridColumn="3" textAlign="center">
                            <Image src={NextProfile} alt="" />
                          </Box>
                        </Grid>
                      </Button>
                    </Center>

                    <WrapItem>
                      <Center>
                        <Button
                          bg="transparent"
                          as="div"
                          display="inline-block"
                        >
                          <Grid
                            templateColumns="1fr 10fr 1fr"
                            alignItems="center"
                          >
                            <Box gridColumn="1">
                              <Image src={ScanStory} alt="" />
                            </Box>
                            <Box gridColumn="2" textAlign="center">
                              <Text textAlign="left" marginLeft="10px">
                                Scan history
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
                          bg="transparent"
                          as="div"
                          display="inline-block"
                          onClick={() => {
                            navigate("/change-password");
                            handlePopoverClose();
                          }}
                        >
                          <Grid
                            templateColumns="1fr 10fr 1fr"
                            alignItems="center"
                          >
                            <Box gridColumn="1">
                              <Image src={Key} alt="" />
                            </Box>
                            <Box gridColumn="2" textAlign="center">
                              <Text textAlign="left" marginLeft="10px">
                                Change your password
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
                            handlePopoverClose();
                          }}
                        >
                          <Grid
                            templateColumns="1fr 10fr 1fr"
                            alignItems="center"
                          >
                            <Box gridColumn="1">
                              <Image src={Translate} alt="" />
                            </Box>
                            <Box gridColumn="2" textAlign="center">
                              <Text textAlign="left" marginLeft="14px">
                                Lenguage
                              </Text>
                            </Box>
                            <Box gridColumn="3" textAlign="center">
                              <Image
                                marginLeft="7px"
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
                            handlePopoverClose();
                          }}
                        >
                          <Grid
                            templateColumns="1fr 10fr 1fr"
                            alignItems="center"
                          >
                            <Box gridColumn="1">
                              <Image src={Appearance} alt="" />
                            </Box>
                            <Box gridColumn="2" textAlign="center">
                              <Text textAlign="left" marginLeft="10px">
                                Appearance
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
                            handlePopoverClose();
                          }}
                        >
                          <Grid
                            templateColumns="1fr 10fr 1fr"
                            alignItems="center"
                          >
                            <Box gridColumn="1">
                              <Image src={Support} alt="" />
                            </Box>
                            <Box gridColumn="2" textAlign="center">
                              <Text textAlign="left" marginLeft="10px">
                                Support
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
                            handlePopoverClose();
                          }}
                        >
                          <Grid
                            templateColumns="1fr 10fr 1fr"
                            alignItems="center"
                          >
                            <Box gridColumn="1">
                              <Image src={Legal} alt="" />
                            </Box>
                            <Box gridColumn="2" textAlign="center">
                              <Text textAlign="left" marginLeft="10px">
                                Legal
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
                          <Grid
                            templateColumns="1fr 10fr 1fr"
                            alignItems="center"
                          >
                            <Box gridColumn="1">
                              <Image src={Logout} alt="" />
                            </Box>
                            <Box gridColumn="2" textAlign="center">
                              <Text textAlign="left" marginLeft="10px">
                                Logout
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
                          onClick={() => setIsWindowOpen(true)}
                        >
                          <Grid
                            templateColumns="1fr 10fr 1fr"
                            alignItems="center"
                          >
                            <Box gridColumn="1">
                              <Image src={Delete} alt="" />
                            </Box>
                            <Box gridColumn="2" textAlign="center">
                              <Text
                                color="red"
                                textAlign="left"
                                marginLeft="10px"
                              >
                                Delete account
                              </Text>
                            </Box>
                            <Box gridColumn="3" textAlign="center">
                              <Image src={NextProfile} alt="" />
                            </Box>
                          </Grid>
                        </Button>
                      </Center>
                    </WrapItem>

                    {/* Delete confirmation dialog */}
                    <AlertDialog
                      isOpen={isWindowOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onWindowClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete User
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure you want to delete your account? This
                            action cannot be undone.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onWindowClose}>
                              Cancel
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={handleDelete}
                              ml={3}
                            >
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Wrap>
                </ButtonGroup>
              </Box>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Navbar;
