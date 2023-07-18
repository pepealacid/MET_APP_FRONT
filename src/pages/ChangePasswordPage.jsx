import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { TOKEN_NAME } from "../context/auth.context";
import authService from "../services/auth.service";
import userService from "../services/user.service";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState("");

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

  return (
    <Box maxW="sm" m="auto">
      <Text fontSize="xl" mb={4}>
        Change Password
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
          Password changed successfully!
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl id="currentPassword" mb={4}>
          <FormLabel>Current Password</FormLabel>
          <Input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="newPassword" mb={4}>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="confirmPassword" mb={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Change Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePasswordPage;
