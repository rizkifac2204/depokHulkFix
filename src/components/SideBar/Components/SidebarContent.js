import React, { Component, useState, useEffect } from "react";
import List from "@mui/material/List";
import NavListItem from "./NavListItem";
import {
  onLoadToggleMenu,
  toggleMenu,
  toggleThirdMenu,
  toggleFourthMenu,
} from "actions";
import { useListMenuContext } from "context/MenuListContext";

function SidebarContent(props) {
  const { closeSidebar } = props;
  const [navLinks, action] = useListMenuContext();

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

  return (
    <div>
      <List className="menu-wrap" style={{ padding: 0 }}>
        {navLinks &&
          navLinks.map((Navlink, index) => (
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
          ))}
      </List>
    </div>
  );
}

export default SidebarContent;
