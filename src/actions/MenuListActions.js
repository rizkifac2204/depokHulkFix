// Redux Menu List Actions

import {
  TOGGLE_MENU,
  TOGGLE_THIRD_MENU,
  TOGGLE_FOURTH_MENU,
  ONLOAD_TOGGLE_MENU,
} from "./Types";

export const toggleMenu = (dispatch, value) =>
  dispatch({ type: TOGGLE_MENU, value });

export const toggleThirdMenu = (dispatch, parent, value) =>
  dispatch({ type: TOGGLE_THIRD_MENU, parent, value });

export const toggleFourthMenu = (dispatch, parent, child, value) =>
  dispatch({ type: TOGGLE_FOURTH_MENU, parent, child, value });

export const onLoadToggleMenu = (dispatch, value) =>
  dispatch({ type: ONLOAD_TOGGLE_MENU, value });
