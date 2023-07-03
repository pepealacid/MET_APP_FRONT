import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextWrapper } from "./context/auth.context.jsx";
// import Navbar from "../components/Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <AuthContextWrapper>
      <Router>
        {/* <Navbar /> */}
        <App />
      </Router>
    </AuthContextWrapper>
  </ChakraProvider>
);
