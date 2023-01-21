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
  RTL,
  HORIZONTAL_MENU,
  CHOOSE_THEME,
  SET_LANGUAGE,
  NOTIFICATION_SIDEBAR,
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

  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     const settingDisplay = localStorage.getItem("settingDisplay");
  //     if (settingDisplay) {
  //       const setting = JSON.parse(settingDisplay);
  //       dispatch({ type: "DARKMODE", value: setting.darkMode });
  //       dispatch({ type: "CHANGE_PRIMARY_COLOR", value: setting.primary });
  //       dispatch({ type: "CHANGE_SECONDARY_COLOR", value: setting.secondary });
  //     }
  //     return;
  //   }
  //   localStorage.setItem("settingDisplay", JSON.stringify(state));
  // }, [state.darkMode, state.primary, state.secondary]);

  // useEffect(() => {
  //   const isMobile =
  //     window.matchMedia && window.matchMedia("(max-width: 480px)").matches;
  //   toast.dismiss();
  //   if (isMobile) dispatch({ type: "TOGGLE_SIDEBAR", value: false });
  //   if (state.toggleSetting) dispatch({ type: "TOGGLE_SETTING", value: false });
  // }, [router]);

  return (
    <RizkiFach.Provider value={[state, dispatch]}>
      {children}
    </RizkiFach.Provider>
  );
};

export { drawerWidth, useRizkiContext, ContextProvider };
