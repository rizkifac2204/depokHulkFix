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
import { useEffect } from "react";

function Container(props) {
  const { children, fullPage } = props;
  const [init] = useRizkiContext();
  const { isDarkModeActive, selectedThemeColor, isRtlActive } = init;
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

  useEffect(() => {
    if (isRtlActive) {
      document.getElementsByTagName("BODY")[0].setAttribute("dir", "rtl");
      theme.direction = "rtl";
    } else {
      document.getElementsByTagName("BODY")[0].setAttribute("dir", "ltr");
      // document.getElementsByTagName("BODY")[0].removeAttribute("dir");
      theme.direction = "ltr";
    }
  }, [isRtlActive]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientOnly>
        {fullPage ? children : <DefaultLayout>{children}</DefaultLayout>}
      </ClientOnly>
    </ThemeProvider>
  );
}

export default Container;
