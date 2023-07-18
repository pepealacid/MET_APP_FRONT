import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextWrapper } from "./context/auth.context.jsx";
import { FavContextWrapper } from "./context/fav.context.jsx";
import customTheme from "./assets/themes/customTheme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={customTheme}>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <AuthContextWrapper>
        <FavContextWrapper>
          <Router>
            <App />
          </Router>
        </FavContextWrapper>
      </AuthContextWrapper>
  </ChakraProvider>
);
