import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: "#f2f5ff",
    100: "#e6ebff",
    200: "#c1ccff",
    300: "#9cacff",
    400: "#758dff",
    500: "#5e72e4",
    600: "#4a5bb4",
    700: "#364385",
    800: "#222b55",
    900: "#101326",
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: "Open Sans, sans-serif",
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
});

export default theme;
