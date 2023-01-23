import { createContext, useContext, useReducer } from "react";

import MenuListItem from "assets/Data/MenuListItem";
import {
  TOGGLE_MENU,
  TOGGLE_THIRD_MENU,
  TOGGLE_FOURTH_MENU,
  ONLOAD_TOGGLE_MENU,
} from "actions/Types";

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case ONLOAD_TOGGLE_MENU:
      nextState = state.map((item, index) => {
        if (index === action.value)
          return {
            ...item,
            isMenuOpen: true,
          };
        return item;
      });
      return nextState;

    case TOGGLE_MENU:
      nextState = state.map((item, index) => {
        if (index !== action.value)
          return {
            ...item,
            isMenuOpen: false,
          };

        return {
          ...item,
          isMenuOpen: !item.isMenuOpen,
        };
      });
      return nextState;

    case TOGGLE_THIRD_MENU:
      nextState = state.map((item, index) => {
        if (index !== action.parent)
          return {
            ...item,
            isMenuOpen: false,
          };

        return {
          ...item,
          isMenuOpen: true,
          child_routes: item.child_routes.map((child, idxchild) => {
            if (idxchild !== action.value)
              return {
                ...child,
                isMenuOpen: false,
              };

            return {
              ...child,
              isMenuOpen: !child.isMenuOpen,
            };
          }),
        };
      });
      return nextState;

    case TOGGLE_FOURTH_MENU:
      nextState = state.map((item, index) => {
        if (index !== action.parent)
          return {
            ...item,
            isMenuOpen: false,
          };

        return {
          ...item,
          isMenuOpen: true,
          child_routes: item.child_routes.map((child, idxChild) => {
            if (idxChild !== action.child)
              return {
                ...child,
                isMenuOpen: false,
              };

            return {
              ...child,
              isMenuOpen: true,
              third_child_routes: child.third_child_routes.map(
                (grandChild, idxGrandChild) => {
                  if (idxGrandChild !== action.value)
                    return {
                      ...grandChild,
                      isMenuOpen: false,
                    };

                  return {
                    ...grandChild,
                    isMenuOpen: !grandChild.isMenuOpen,
                  };
                }
              ),
            };
          }),
        };
      });
      return nextState;

    default:
      throw new Error();
  }
}

const menuContext = createContext();
const useListMenuContext = () => {
  const context = useContext(menuContext);
  return context;
};

const MenuContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, MenuListItem);
  return (
    <menuContext.Provider value={[state, dispatch]}>
      {children}
    </menuContext.Provider>
  );
};

export { useListMenuContext, MenuContextProvider };
