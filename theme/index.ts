import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: "#e8edff",
    100: "#c6d4ff",
    200: "#a3bbff",
    300: "#7aa0ff",
    400: "#4f84ff",
    500: "#4169e1",
    600: "#3252b3",
    700: "#243b84",
    800: "#142455",
    900: "#070e27",
  },
  text: {
    primary: "#0d0d0d",
    secondary: "#2f2f2f",
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "md",
        fontWeight: 400,
        boxShadow: "sm",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: { bg: "brand.600", boxShadow: "md" },
        },
      },
      defaultProps: {
        colorScheme: "brand",
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "black",
      },
    },
  },
});

export default theme;
