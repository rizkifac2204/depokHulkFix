import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// themes
import darkTheme from "src/assets/themes/DarkTheme";
import lightTheme from "assets/themes/LightTheme";
import tealTheme from "assets/themes/TealTheme";
import violetTheme from "assets/themes/VioletTheme";

// components
import DefaultLayout from "./DefaultLayout";
import ClientOnly from "utils/ClientOnly";

import { useRizkiContext } from "context/AppContext";

function Container({ children }) {
  const [init] = useRizkiContext();
  const { isDarkModeActive, selectedThemeColor } = init;
  let theme = "";
  if (isDarkModeActive) {
    theme = darkTheme;
  } else {
    if (selectedThemeColor === "light-theme") {
      theme = lightTheme;
    } else if (selectedThemeColor === "teal-theme") {
      theme = tealTheme;
    } else if (selectedThemeColor === "violet-theme") {
      theme = violetTheme;
    } else {
      theme = lightTheme;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientOnly>
        <DefaultLayout>{children}</DefaultLayout>
      </ClientOnly>
    </ThemeProvider>
  );
}

export default Container;
