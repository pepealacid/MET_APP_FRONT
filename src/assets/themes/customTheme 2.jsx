import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    light: {
      primary: "#FFFFFF",
      secondary: "#F4F4F4",
      // Define other light mode colors
    },
    dark: {
      primary: "#1A202C",
      secondary: "#2D3748",
      // Define other dark mode colors
    },
  },
});

export default customTheme;
