import { createContext, useEffect, useState } from "react";
import { Roboto } from "@next/font/google";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create theme context
export const ThemeContext = createContext();

const MuiThemeProvider = ({ children }) => {
  // Color mode state
  const [colorMode, setColorMode] = useState("system");

  // Conditonal color mode toggle
  const toggleColorMode = (event, newColorMode) => {
    if (newColorMode === "system") {
      localStorage.removeItem("mui-mode");
      setColorMode("system");
    }
    if (newColorMode === "light" || newColorMode === "dark") {
      localStorage.setItem("mui-mode", newColorMode);
      setColorMode(newColorMode);
    }
  };

  useEffect(() => {
    // Perform localStorage action
    const preferredColorMode = localStorage.getItem("mui-mode");
    setColorMode(
      preferredColorMode === "dark"
        ? "dark"
        : preferredColorMode === "light"
        ? "light"
        : "system"
    );
  }, []);

  // System color mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Themeing
  const theme = createTheme({
    palette: {
      mode:
        colorMode === "system" || !colorMode
          ? prefersDarkMode
            ? "dark"
            : "light"
          : colorMode,
      primary: {
        main: "#009688",
      },
      secondary: {
        main: "#4caf50",
      },
      excel: {
        light: "rgba(0, 0, 0, 0.23)",
        dark: "rgba(255, 255, 255, 0.23)",
        hover: "rgba(0, 0, 0, 0.87)",
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default MuiThemeProvider;
