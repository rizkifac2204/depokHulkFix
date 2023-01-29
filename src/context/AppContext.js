import { useRouter } from "next/router";
import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useRef,
} from "react";
import {
  COLLAPSED_SIDEBAR,
  MINI_SIDEBAR,
  DARK_MODE,
  HORIZONTAL_MENU,
  CHOOSE_THEME,
  SET_LANGUAGE,
  NOTIFICATION_SIDEBAR,
  RTL,
} from "actions/Types";

function reducer(state, action) {
  switch (action.type) {
    case COLLAPSED_SIDEBAR:
      return { ...state, navCollapsed: action.value };
    case MINI_SIDEBAR:
      return { ...state, isMiniSidebarActive: action.value };
    case DARK_MODE:
      return { ...state, isDarkModeActive: action.value };
    case SET_LANGUAGE:
      return { ...state, languages: action.value };
    case HORIZONTAL_MENU:
      return { ...state, isHorizontalMenuActive: action.value };
    case CHOOSE_THEME:
      return { ...state, selectedThemeColor: action.value };
    case NOTIFICATION_SIDEBAR:
      return { ...state, notificationSidebar: action.value };
    case RTL:
      return { ...state, isRtlActive: action.value };
    default:
      throw new Error();
  }
}

const drawerWidth = 260;
const RizkiFach = createContext();
const useRizkiContext = () => {
  const context = useContext(RizkiFach);
  return context;
};

const ContextProvider = ({ children }) => {
  const router = useRouter();
  const initialState = {
    isDarkModeActive: false,
    isHorizontalMenuActive: false,
    isMiniSidebarActive: false,
    isRtlActive: false,
    languages: [
      { languageId: "english", locale: "en", name: "English", icon: "usa.png" },
      {
        languageId: "french",
        locale: "fr",
        name: "French",
        icon: "france.png",
      },
      {
        languageId: "saudi-arabia",
        locale: "ar",
        name: "Arabic",
        icon: "saudi-arabia.png",
      },
      {
        languageId: "spanish",
        locale: "es",
        name: "Spanish",
        icon: "spain.png",
      },
      {
        languageId: "korean",
        locale: "ko",
        name: "Korean",
        icon: "korean.png",
      },
      {
        languageId: "japanese",
        locale: "ja",
        name: "Japanese",
        icon: "japanese.png",
      },
      {
        languageId: "chinese",
        locale: "zh",
        name: "Chinese",
        icon: "chinese.png",
      },
    ],
    locale: {
      languageId: "english",
      locale: "en",
      name: "English",
      icon: "usa.png",
    },
    navCollapsed: true,
    notificationSidebar: false,
    selectedThemeColor: "light-theme",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      const settingDisplay = localStorage.getItem("settingDisplayDepokApps");
      if (settingDisplay) {
        const setting = JSON.parse(settingDisplay);
        setTimeout(() => {
          // DARKMODE
          if (setting.isDarkModeActive) {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
          } else {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
          }
          dispatch({ type: DARK_MODE, value: setting.isDarkModeActive });

          // CHOOSE_THEME
          document.body.classList.remove(
            "light-theme",
            "teal-theme",
            "violet-theme"
          );
          document.body.classList.add(setting.selectedThemeColor);
          dispatch({ type: CHOOSE_THEME, value: setting.selectedThemeColor });

          // HORIZONTAL_MENU
          if (setting.isHorizontalMenuActive) {
            document.body.classList.add("horizontal-layout");
            dispatch({ type: MINI_SIDEBAR, value: false });
            dispatch({
              type: HORIZONTAL_MENU,
              value: true,
            });
            dispatch({
              type: COLLAPSED_SIDEBAR,
              value: false,
            });
          } else {
            if (document.body.classList.contains("horizontal-layout")) {
              document.body.classList.remove("horizontal-layout");
              dispatch({
                type: HORIZONTAL_MENU,
                value: false,
              });
            }
            if (setting.isMiniSidebarActive === false) {
              dispatch({
                type: COLLAPSED_SIDEBAR,
                value: true,
              });
            }
          }

          // MINI_SIDEBAR
          if (setting.isMiniSidebarActive) {
            document.body.classList.add("icon-layout-wrap");
            document.body.classList.remove("horizontal-layout");
            dispatch({
              type: HORIZONTAL_MENU,
              value: false,
            });
            dispatch({ type: MINI_SIDEBAR, value: true });
            dispatch({
              type: COLLAPSED_SIDEBAR,
              value: true,
            });
          } else {
            document.body.classList.remove("icon-layout-wrap");
            // miniSidebarAction(action, false);
            dispatch({
              type: MINI_SIDEBAR,
              value: false,
            });
            if (setting.isHorizontalMenuActive === false) {
              dispatch({
                type: COLLAPSED_SIDEBAR,
                value: true,
              });
            }
          }

          // RTL
          if (setting.isRtlActive) {
            document.body.classList.add("rtl-layout");
          } else {
            document.body.classList.remove("rtl-layout");
          }
          dispatch({ type: RTL, value: setting.isRtlActive });
        }, 2000);
      }
      return;
    }
    localStorage.setItem("settingDisplayDepokApps", JSON.stringify(state));
  }, [
    state.isDarkModeActive,
    state.selectedThemeColor,
    state.isHorizontalMenuActive,
    state.isMiniSidebarActive,
    state.isRtlActive,
  ]);

  useEffect(() => {
    const isMobile =
      window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) dispatch({ type: COLLAPSED_SIDEBAR, value: false });
  }, [router]);

  useEffect(() => {
    if (state.isRtlActiveisRtlActive) {
      document.getElementsByTagName("BODY")[0].setAttribute("dir", "rtl");
    } else {
      document.getElementsByTagName("BODY")[0].setAttribute("dir", "ltr");
      // document.getElementsByTagName("BODY")[0].removeAttribute("dir");
    }
  }, [state.isRtlActive]);

  return (
    <RizkiFach.Provider value={[state, dispatch]}>
      {children}
    </RizkiFach.Provider>
  );
};

export { drawerWidth, useRizkiContext, ContextProvider };
