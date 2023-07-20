import React, { useState, useEffect, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { TOKEN_NAME } from "../context/auth.context";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LenguageContext } from "../context/lenguage.context";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordCheck, setShowNewPasswordCheck] = useState(false);

  const { t } = useContext(LenguageContext);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await authService.changePassword(userId, currentPassword, newPassword);
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const user = await userService.getUser(token);
      const userId = user.data._id;
      console.log(userId);
      setUserId(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleNewPasswordCheck = () => {
    setShowNewPasswordCheck(!showNewPasswordCheck);
  };

  const bg = useColorModeValue("black", "white");
  const tp = useColorModeValue("white", "black");

  return (
    t?.changeYourPassword && (
      <Box maxW="sm" m="auto">
        <Text fontSize="xl" mb={4}>
          {t?.changeYourPassword.change || "Change your password"}
        </Text>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {success && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            {t?.changeYourPassword.success || "Password changed successfully!"}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl id="currentPassword" mb={4}>
            <FormLabel>
              {t?.changeYourPassword.current || "Current Password"}{" "}
            </FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="currentPassword"
                value={currentPassword}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  size="m"
                  onClick={handleTogglePassword}
                  backgroundColor="transparent"
                  left="10px"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="newPassword" mb={4}>
            <FormLabel>{t?.changeYourPassword.new || "New Password"}</FormLabel>
            <InputGroup>
              <Input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  size="m"
                  onClick={handleToggleNewPassword}
                  backgroundColor="transparent"
                  left="10px"
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="confirmPassword" mb={4}>
            <FormLabel>
              {t?.changeYourPassword.confirm || "Confirm Password"}
            </FormLabel>
            <InputGroup>
              <Input
                type={showNewPasswordCheck ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  size="m"
                  onClick={handleToggleNewPasswordCheck}
                  backgroundColor="transparent"
                  left="10px"
                >
                  {showNewPasswordCheck ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button type="submit" bg={bg} color={tp}>
            {t?.changeYourPassword.change || "Change Password"}
          </Button>
        </form>
      </Box>
    )
  );
};

export default ChangePasswordPage;
