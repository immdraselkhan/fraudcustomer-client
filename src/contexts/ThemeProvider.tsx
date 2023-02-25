import { createContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Create theme context
export const ThemeContext = createContext<any>({});

// Add inside palette
declare module "@mui/material/styles" {
  interface Palette {
    excel: {
      light: string;
      dark: string;
      hover: string;
    };
  }
}

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Color mode state
  const [colorMode, setColorMode] = useState("system");

  // Conditonal color mode toggle
  const toggleColorMode = (
    event: React.MouseEvent<HTMLElement>,
    newColorMode: string
  ) => {
    if (newColorMode === "system") {
      localStorage.removeItem("mui-mode");
      setColorMode("system");
    }
    if (newColorMode === "light" || newColorMode === "dark") {
      localStorage.setItem("mui-mode", newColorMode);
      setColorMode(newColorMode);
    }
  };

  // Perform localStorage action
  useEffect(() => {
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

  // Customize the theme
  const theme = createTheme({
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true,
        },
      },
    },
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
  } as ThemeOptions);

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default MuiThemeProvider;
