import React, { Component, useState, useEffect } from "react";
import { Box, Icon } from "@mui/material";
import MenuListItem from "assets/Data/MenuListItem";
import NavMenuItem from "./NavMenuItem";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CastConnectedOutlinedIcon from "@mui/icons-material/CastConnectedOutlined";
import DataArrayOutlinedIcon from "@mui/icons-material/DataArrayOutlined";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";

function HorizontalMenu(props) {
  const [state, setState] = useState({
    navLinks: MenuListItem,
    general: null,
    sdmo: null,
    pph: null,
    ppdatin: null,
    hukumsengketa: null,
  });
  const { general, sdmo, pph, ppdatin, hukumsengketa } = state;

  function setCategory() {
    let category1 = state.navLinks.filter((item, i) => {
      return item.category === "general";
    });
    let category2 = state.navLinks.filter((item, i) => {
      return item.category === "sdmo";
    });
    let category3 = state.navLinks.filter((item, i) => {
      return item.category === "pph";
    });
    let category4 = state.navLinks.filter((item, i) => {
      return item.category === "ppdatin";
    });
    let category5 = state.navLinks.filter((item, i) => {
      return item.category === "hukumsengketa";
    });

    setState({
      ...state,
      general: category1,
      sdmo: category2,
      pph: category3,
      ppdatin: category4,
      hukumsengketa: category5,
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
            <CorporateFareIcon />
            <span className="menu-title">SDMO</span>
          </span>
          <ul className="list-unstyled sub-menu">
            {sdmo &&
              sdmo.map((menu, key) => <NavMenuItem menu={menu} key={key} />)}
          </ul>
        </li>
        <li className="nav-item menu-item-has-child">
          <span>
            <CastConnectedOutlinedIcon />
            <span className="menu-title">
              <span className="menu-title">PPH</span>
            </span>
          </span>
          <ul className="list-unstyled sub-menu">
            {pph &&
              pph.map((menu, key) => <NavMenuItem menu={menu} key={key} />)}
          </ul>
        </li>
        <li className="nav-item menu-item-has-child">
          <span>
            <DataArrayOutlinedIcon />
            <span className="menu-title">
              <span className="menu-title">PPDATIN</span>
            </span>
          </span>
          <ul className="list-unstyled sub-menu">
            {ppdatin &&
              ppdatin.map((menu, key) => <NavMenuItem menu={menu} key={key} />)}
          </ul>
        </li>
        <li className="nav-item menu-item-has-child">
          <span>
            <BalanceOutlinedIcon />
            <span className="menu-title">
              <span className="menu-title">HUKUMSENGKETA</span>
            </span>
          </span>
          <ul className="list-unstyled sub-menu">
            {hukumsengketa &&
              hukumsengketa.map((menu, key) => (
                <NavMenuItem menu={menu} key={key} />
              ))}
          </ul>
        </li>
      </ul>
    </Box>
  );
}

export default HorizontalMenu;
