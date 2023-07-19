import {
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../main.css";
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();

  const { authenticate, storeToken, error } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/home/artworks");
    }
  }, []);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.repeatPassword) {
      setPasswordsMatch(false);
      return;
    }

    authService
      .signup(signupData)
      .then(({ data }) => navigate("/login"))
      .catch((err) => console.log(err));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const { email, password, repeatPassword } = signupData;

  const passwordsDoNotMatch = repeatPassword !== "" && password !== repeatPassword;

  return (
    <>
      <Box paddingLeft="20px" paddingTop="80px" paddingBottom="60px">
        <Text
          as="b"
          fontSize="30px"
          paddingBottom="20px"
          className="login-header"
        >
          Hello there!
        </Text>
        <Text
          marginTop="20px"
          fontSize="24px"
          width="340px"
          className="login-text"
        >
          Register to make the best experience at the MET museum.
        </Text>
      </Box>
      <Box padding="20px">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleInputChange}
              name="email"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleInputChange}
                name="password"
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

          <FormControl>
            <FormLabel>Repeat Password</FormLabel>
            <InputGroup>
              <Input
                type={showRepeatPassword ? "text" : "password"}
                value={repeatPassword}
                onChange={handleInputChange}
                name="repeatPassword"
              />
              <InputRightElement width="4.5rem">
                <Button
                  size="m"
                  onClick={handleToggleRepeatPassword}
                  backgroundColor="transparent"
                  left="10px"
                >
                  {showRepeatPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {passwordsDoNotMatch && (
            <Text color="red" mt={2}>
              Passwords do not match.
            </Text>
          )}

          <Box position="fixed" bottom="0" left="0" right="0" p="4" bg="white">
            <Flex justifyContent="center">
              <Box>
                <Link to="/login">
                  <Text align="center" marginBottom="28px">
                    Already have an account? Log in
                  </Text>
                </Link>
                <Button
                  color="white"
                  backgroundColor="black"
                  width="380px"
                  variant="solid"
                  type="submit"
                  disabled={!passwordsMatch || passwordsDoNotMatch}
                >
                  Sign up
                </Button>
              </Box>
            </Flex>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignupPage;
