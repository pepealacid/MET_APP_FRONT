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

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { authenticate, storeToken, error } = useContext(AuthContext);

  useEffect(()=>{
    const token = localStorage.getItem("authToken")
    if (token){
      navigate("/home/artworks")
    }
  }, [])

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    authService
      .login(loginData)
      .then(({ data }) => {
        console.log(data);
        storeToken(data.authToken);
        authenticate();
        navigate("/home/artworks");
      })
      .catch((err) => console.log(err));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { password, email } = loginData;

  return (
    <>
      <Box paddingLeft="20px" paddingTop="80px" paddingBottom="60px">
        <Text
          as="b"
          fontSize="30px"
          paddingBottom="20px"
          className="login-header"
        >
          Welcome back!
        </Text>
        <Text marginTop="20px" fontSize="24px" width="340px" className="login-text">
          Sign in to start discovering all the art.
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
          <Box position="fixed" bottom="0" left="0" right="0" p="4" bg="white">
            <Flex justifyContent="center">
              <Box>
                <Link to="/signup">
                  <Text align="center" marginBottom="28px">Don't have an account? Sign up</Text>
                </Link>
                <Button color="white" backgroundColor="black" width="380px"  variant="solid" type="submit">
                  Log in
                </Button>
              </Box>
            </Flex>
          </Box>

          <p>{error}</p>
        </form>
      </Box>
    </>
  );
};

export default LoginPage;
