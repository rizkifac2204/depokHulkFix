import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// or for Moment.js
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// themes
import darkTheme from "src/assets/themes/DarkTheme";
import lightTheme from "assets/themes/LightTheme";
import tealTheme from "assets/themes/TealTheme";
import violetTheme from "assets/themes/VioletTheme";

// components
import DefaultLayout from "./DefaultLayout";
import ClientOnly from "utils/ClientOnly";

// Tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useRizkiContext } from "context/AppContext";

const queryClient = new QueryClient();

function Container(props) {
  const { children, fullPage } = props;
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
      <QueryClientProvider client={queryClient}>
        <ClientOnly>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            {fullPage ? children : <DefaultLayout>{children}</DefaultLayout>}
          </LocalizationProvider>
        </ClientOnly>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Container;
