import { useEffect } from "react";
import List from "@mui/material/List";
import NavListItem from "./NavListItem";
import {
  onLoadToggleMenu,
  toggleMenu,
  toggleThirdMenu,
  toggleFourthMenu,
} from "actions";
import { useListMenuContext } from "context/MenuListContext";
import { useAuthContext } from "context/AuthContext";

function SidebarContent(props) {
  const { closeSidebar } = props;
  const [navLinks, action] = useListMenuContext();
  const { user } = useAuthContext();

  function getPlanName(name) {
    let newName = name.replace("-", " ");
    return newName;
  }

  useEffect(() => {
    let currentURL = window.location.href;
    let currentIndex;
    for (let i = 0; i < navLinks.length; i++) {
      if (navLinks[i].menu == currentURL.split("/")[4]) {
        currentIndex = i;
      }
    }
    if (currentIndex) onLoadToggleMenuThis(currentIndex);
  }, []);

  function onLoadToggleMenuThis(index) {
    onLoadToggleMenu(action, index);
  }

  function toggleMenuThis(index) {
    toggleMenu(action, index);
  }

  function toggleThirdMenuThis(parent, index) {
    toggleThirdMenu(action, parent, index);
  }

  function toggleFourthMenuThis(parent, child, index) {
    toggleFourthMenu(action, parent, child, index);
    if (closeSidebar) {
      closeSidebar();
    }
  }

  function toggleThirdMenuAndCloseSidebarThis(parent, index) {
    toggleThirdMenu(action, parent, index);
    if (closeSidebar) {
      closeSidebar();
    }
  }

  if (!user) return null;
  return (
    <div>
      <List className="menu-wrap" style={{ padding: 0 }}>
        {navLinks &&
          navLinks.map((Navlink, index) => {
            // hidden jika tidak ada akses level
            if (
              Navlink.limit_access_level &&
              !Navlink.limit_access_level.includes(user.level)
            )
              return <div key={index}></div>;
            return (
              <NavListItem
                menu={Navlink}
                parentIndex={index}
                key={index}
                toggleMenu={() => toggleMenuThis(index)}
                toggleThirdMenu={toggleThirdMenuThis}
                toggleFourthMenu={toggleFourthMenuThis}
                toggleThirdMenuAndCloseSidebar={
                  toggleThirdMenuAndCloseSidebarThis
                }
                closeSidebar={closeSidebar}
              />
            );
          })}
      </List>
    </div>
  );
}

export default SidebarContent;
