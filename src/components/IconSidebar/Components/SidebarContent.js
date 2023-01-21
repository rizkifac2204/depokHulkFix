import { Fragment, useState } from "react";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import MenuListItem from "assets/Data/MenuListItem";
// Intl messages
import formatMenuTitle from "utils/formatMenuTitle";

function SidebarContent() {
  const [navLinks, setNavLinks] = useState(MenuListItem);
  function getPlanName(name) {
    let newName = name.replace("-", " ");
    return newName;
  }

  return (
    <div className="icon-menu-wrap">
      <ul className="main-menu">
        {navLinks &&
          navLinks.map((navlink, index) => (
            <Fragment key={index}>
              {navlink.child_routes !== null ? (
                <li className="menu-item">
                  <Link href={navlink.path}>{navlink.icon}</Link>
                  <div className="sub-menu-wrap">
                    <div className="sub-menu-header">
                      {formatMenuTitle(navlink.menu_title)}
                    </div>
                    <div className="sub-menu-list">
                      <ul className="sub-menu">
                        {navlink.child_routes.map((subMenu, subKey) => (
                          <li key={subKey}>
                            <Link href={subMenu.path}>
                              {formatMenuTitle(subMenu.menu_title)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li className="menu-item">
                  <Tooltip
                    title={formatMenuTitle(navlink.menu_title)}
                    placement="right"
                  >
                    <Link href={navlink.path}>{navlink.icon}</Link>
                  </Tooltip>
                </li>
              )}
            </Fragment>
          ))}
      </ul>
    </div>
  );
}

export default SidebarContent;
