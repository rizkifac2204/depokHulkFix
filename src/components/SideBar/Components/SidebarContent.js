import React, { Component, useState, useEffect } from "react";
import List from "@mui/material/List";
import NavListItem from "./NavListItem";
import {
  toggleThirdMenu,
  toggleMenu,
  toggleFourthMenu,
  onLoadToggleMenu,
} from "actions";
import MenuListItem from "assets/Data/MenuListItem";

function SidebarContent(props) {
  const { closeSidebar } = props;
  const [navLinks, setNavLinks] = useState(MenuListItem);

  useEffect(() => {
    setTimeout(() => {
      // setNavLinks([]);
    }, 2000);
  }, []);

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
    onLoadToggleMenuThis(currentIndex);
  }, []);

  function onLoadToggleMenuThis(index) {
    onLoadToggleMenu(index);
    // setNavLinks((prev) => navLinks);
    // this.setState({
    //   navLinks: this.props.navLinks,
    // });
  }

  function toggleMenuThis(index) {
    toggleMenu(index);
    // this.setState({
    //   navLinks: this.props.navLinks,
    // });
  }

  function toggleThirdMenuThis(index) {
    toggleThirdMenu(index);
    // this.setState({
    //   navLinks: this.props.navLinks,
    // });
  }

  function toggleThirdMenuAndCloseSidebarThis(index) {
    toggleThirdMenu(index);
    // this.setState({
    //   navLinks: this.props.navLinks,
    // });
    if (closeSidebar) {
      closeSidebar();
    }
  }

  function toggleFourthMenuThis(fourthindex) {
    toggleFourthMenu(fourthindex);
    // this.setState({
    //   navLinks: this.props.navLinks,
    // });
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
              key={index}
              toggleMenu={() => toggleMenuThis(index)}
              toggleFourthMenu={(e) => toggleFourthMenuThis(e)}
              toggleThirdMenu={(e) => toggleThirdMenuThis(e)}
              toggleThirdMenuAndCloseSidebar={(e) =>
                toggleThirdMenuAndCloseSidebarThis(e)
              }
              closeSidebar={closeSidebar}
            />
          ))}
      </List>
    </div>
  );
}

export default SidebarContent;
