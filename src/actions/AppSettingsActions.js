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

export const collapsedSidebarAction = (dispatch, value) =>
  dispatch({ type: COLLAPSED_SIDEBAR, value });
export const miniSidebarAction = (dispatch, value) =>
  dispatch({ type: MINI_SIDEBAR, value });
export const darkModeAction = (dispatch, value) =>
  dispatch({ type: DARK_MODE, value });
export const rtlAction = (dispatch, value) => dispatch({ type: RTL, value });
export const setLanguage = (dispatch, value) =>
  dispatch({ type: SET_LANGUAGE, value });
export const horizontalMenuAction = (dispatch, value) =>
  dispatch({ type: HORIZONTAL_MENU, value });
export const chooseThemeAction = (dispatch, value) =>
  dispatch({ type: CHOOSE_THEME, value });
export const notificationSidebarAction = (dispatch, value) =>
  dispatch({ type: NOTIFICATION_SIDEBAR, value });
