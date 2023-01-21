import React, { Component, useState, useEffect } from "react";
import { Box, Icon } from "@mui/material";
import MenuListItem from "assets/Data/MenuListItem";
import NavMenuItem from "./NavMenuItem";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TouchAppIcon from "@mui/icons-material/TouchApp";

function HorizontalMenu(props) {
  const [state, setState] = useState({
    navLinks: MenuListItem,
    general: null,
    modules: null,
    components: null,
    application: null,
  });
  const { general, modules, components, application } = state;

  function setCategory() {
    let category1 = state.navLinks.filter((item, i) => {
      return item.category === "general";
    });
    let category2 = state.navLinks.filter((item, i) => {
      return item.category === "modules";
    });
    let category3 = state.navLinks.filter((item, i) => {
      return item.category === "components";
    });
    let category4 = state.navLinks.filter((item, i) => {
      return item.category === "applications";
    });

    setState({
      ...state,
      general: category1,
      modules: category2,
      components: category3,
      application: category4,
    });
  }

  useEffect(() => setCategory(), []);

  return (
    <Box className="horizontal-menu">
      <ul className="list-unstyled nav">
        <li className="nav-item menu-item-has-child">
          <span>
            <AppRegistrationIcon />
            <span className="menu-title">General</span>
          </span>
          <ul className="list-unstyled sub-menu">
            {general &&
              general.map((menu, key) => <NavMenuItem menu={menu} key={key} />)}
          </ul>
        </li>
        <li className="nav-item menu-item-has-child">
          <span>
            <ViewModuleIcon />
            <span className="menu-title">Modules</span>
          </span>
          <ul className="list-unstyled sub-menu">
            {modules &&
              modules.map((menu, key) => <NavMenuItem menu={menu} key={key} />)}
          </ul>
        </li>
        <li className="nav-item menu-item-has-child">
          <span>
            <WidgetsIcon />
            <span className="menu-title">
              <span className="menu-title">Components</span>
            </span>
          </span>
          <ul className="list-unstyled sub-menu">
            {components &&
              components.map((menu, key) => (
                <NavMenuItem menu={menu} key={key} />
              ))}
          </ul>
        </li>
        <li className="nav-item menu-item-has-child">
          <span>
            <TouchAppIcon />
            <span className="menu-title">
              <span className="menu-title">applications</span>
            </span>
          </span>
          <ul className="list-unstyled sub-menu">
            {application &&
              application.map((menu, key) => (
                <NavMenuItem menu={menu} key={key} />
              ))}
          </ul>
        </li>
      </ul>
    </Box>
  );
}

export default HorizontalMenu;
