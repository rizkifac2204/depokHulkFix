import React, { Fragment, Component, useState, useEffect } from "react";
import Link from "next/link";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import {
  List,
  ListItem,
  Collapse,
  Icon,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";
import formatMenuTitle from "utils/formatMenuTitle";
import RemoveIcon from "@mui/icons-material/Remove";

const styles = (theme) => ({
  textWhite: {
    color: `${theme.palette.common.white} !important`,
    "& span ,& a": {
      color: theme.palette.common.white,
      fontSize: "0.9375rem ",
    },
  },
  ListItem: {
    borderBottom: "1px solid #404854",
    paddingTop: 14,
    paddingBottom: 14,
    "&:hover": {
      backgroundColor: "#515864",
    },
    "@media (max-width:1560px)": {
      paddingTop: 10,
      paddingBottom: 10,
    },
  },
  desc: {
    color: "#969fa4",
    "& span": {
      fontSize: "0.75rem",
      color: "#969fa4",
    },
  },
  iconWrap: {
    fontFamily: "Material Icons Outlined",
    fontSize: "20px !important",
  },
  font9: {
    fontFamily: "Material Icons Outlined",
    fontSize: "9px !important",
  },
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  menuOpen: {
    backgroundColor: "#19222b",
    borderBottom: "0 !important",
    "&:hover": {
      backgroundColor: "#19222b",
    },
    "& .sub-menu": {
      padding: "0 0 10px",
      "& div.MuiListItem-root": {
        padding: "2px 10px 2px 36px",
        border: 0,
      },
      "& li.MuiListItem-root": {
        padding: 0,
        "& a": {
          padding: "5px 10px 5px 36px",
        },
      },
      "& .active": {
        backgroundColor: "#515864",
      },
      "& .sub-menu": {
        "& .MuiListItem-root": {
          padding: 0,
          "& a": {
            padding: "4px 16px 4px 56px",
          },
        },
      },
    },
  },
  textLink: {
    borderBottom: "1px solid #404854",
    padding: 0,
    "& a": {
      padding: "14px 16px",
      display: "block",
      "@media (max-width:1560px)": {
        padding: "10px 16px",
      },
    },
  },
  linkActive: {
    backgroundColor: "#19222b",
    "&:hover": {
      backgroundColor: "#19222b",
    },
  },
  w100: {
    width: "95%",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
  },
});

function NavListItem(props) {
  const [thirdMenuOpen, setThirdMenuOpen] = useState(false);
  const { classes, closeSidebar, toggleMenu } = props;
  const {
    menu,
    parentIndex,
    toggleThirdMenu,
    toggleFourthMenu,
    toggleThirdMenuAndCloseSidebar,
  } = props;

  function toggleAndCloseSidebar() {
    toggleMenu();
    if (closeSidebar) {
      closeSidebar();
    }
  }

  if (menu.child_routes !== null && menu.fullPageMenu === false) {
    return (
      <li>
        <ListItemButton
          onClick={() => toggleMenu()}
          className={clsx(
            classes.textWhite,
            classes.ListItem,
            {
              [`active-menu ${classes.menuOpen}`]: menu.isMenuOpen,
            },
            "list-item"
          )}
        >
          <div className={classes.w100}>
            {/* Level 1 */}
            <div className={classes.flexCenter}>
              <Box component="span">{menu.icon}</Box>
              <ListItemText
                sx={{ pl: 1 }}
                primary={formatMenuTitle(menu.menu_title)}
              />
              {menu.isMenuOpen ? (
                <Icon style={{ fontSize: 20, width: 25 }}>arrow_drop_up</Icon>
              ) : (
                <Icon style={{ fontSize: 20, width: 25 }}>arrow_drop_down</Icon>
              )}
            </div>

            {/* description level 1 */}
            {menu.desc ? (
              menu.content.length !== 0 ? (
                menu.isMenuOpen ? null : (
                  <Box
                    fontSize="body1.fontSize"
                    className={`desc-wrap ${classes.truncate} ${classes.desc}`}
                    display="block"
                  >
                    {menu.content}
                  </Box>
                )
              ) : menu.isMenuOpen ? null : (
                <Box
                  fontSize="body1.fontSize"
                  className={`desc-wrap ${classes.truncate} ${classes.desc}`}
                  display="block"
                >
                  {menu.child_routes
                    .map((item, index) => {
                      return (
                        <span key={index}>
                          {formatMenuTitle(item.menu_title)}
                        </span>
                      );
                    })
                    .reduce((prev, curr) => [prev, ", ", curr])}
                </Box>
              )
            ) : null}
          </div>
        </ListItemButton>

        {/* first collapse */}
        <Collapse
          in={menu.isMenuOpen}
          timeout="auto"
          unmountOnExit
          className={clsx(classes.textWhite, {
            [classes.menuOpen]: menu.isMenuOpen,
          })}
        >
          <List component="ul" className="sub-menu">
            {menu.child_routes.map((subMenu, index) => {
              // Third child route is not null
              if (
                subMenu.third_child_routes !== null &&
                subMenu.fullPageMenu === false
              ) {
                return (
                  <li key={index}>
                    <ListItem
                      component="div"
                      onClick={() => toggleThirdMenu(parentIndex, index)}
                      className={clsx(
                        classes.textWhite,
                        classes.ListItem,
                        {
                          [classes.menuOpen]: subMenu.isMenuOpen,
                        },
                        "list-item"
                      )}
                    >
                      {/* Level 2  */}
                      <div className={classes.w100}>
                        <div className={classes.flexCenter}>
                          <Box component="span">
                            <RemoveIcon sx={{ fontSize: 10 }} />
                          </Box>
                          <ListItemText
                            primary={formatMenuTitle(subMenu.menu_title)}
                            style={{ paddingLeft: 8 }}
                          />
                          {subMenu.isMenuOpen ? (
                            <Icon style={{ fontSize: 20, width: 25 }}>
                              arrow_drop_up
                            </Icon>
                          ) : (
                            <Icon style={{ fontSize: 20, width: 25 }}>
                              arrow_drop_down
                            </Icon>
                          )}
                        </div>
                      </div>
                    </ListItem>

                    {/* second collapse */}
                    <Collapse
                      in={subMenu.isMenuOpen}
                      timeout="auto"
                      unmountOnExit
                      className={clsx(classes.textWhite, {
                        [classes.menuOpen]: subMenu.isMenuOpen,
                      })}
                    >
                      {/* Level 3 */}
                      <List component="ul" className="sub-menu">
                        {subMenu.third_child_routes.map(
                          (thirdMenu, fourthindex) => {
                            return (
                              <Fragment key={fourthindex}>
                                <ListItem
                                  sx={
                                    thirdMenu.isMenuOpen
                                      ? { backgroundColor: "#4D555D" }
                                      : null
                                  }
                                  component="li"
                                  onClick={() =>
                                    toggleFourthMenu(
                                      parentIndex,
                                      index,
                                      fourthindex
                                    )
                                  }
                                >
                                  <Link
                                    className={`link ${classes.flexCenter}`}
                                    href={thirdMenu.path}
                                  >
                                    {/* terakhir  */}
                                    <Box component="span" mr={1}>
                                      <RemoveIcon sx={{ fontSize: 10 }} />
                                    </Box>
                                    {formatMenuTitle(thirdMenu.menu_title)}
                                  </Link>
                                </ListItem>
                              </Fragment>
                            );
                          }
                        )}
                      </List>
                    </Collapse>
                  </li>
                );
              }

              // Third child route is null
              return (
                <ListItem
                  key={index}
                  component="li"
                  sx={
                    subMenu.isMenuOpen ? { backgroundColor: "#4D555D" } : null
                  }
                  onClick={() =>
                    toggleThirdMenuAndCloseSidebar(parentIndex, index)
                  }
                  className={classes.childList}
                >
                  <Link
                    className={`list-link ${classes.flexCenter}`}
                    href={subMenu.path}
                  >
                    {/* sub 1 */}
                    <Box component="span" mr={1}>
                      <RemoveIcon sx={{ fontSize: 10 }} />
                    </Box>
                    {formatMenuTitle(subMenu.menu_title)}
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </li>
    );
  }

  return (
    <ListItemButton
      className={clsx(
        classes.textWhite,
        classes.textLink,
        {
          [classes.linkActive]: menu.isMenuOpen,
        },
        "list-item"
      )}
      onClick={() => toggleAndCloseSidebar()}
    >
      <Link href={menu.path}>
        <Box className={classes.flexCenter}>
          <Box component="span">{menu.icon}</Box>
          <ListItemText
            sx={{ pl: 1 }}
            primary={formatMenuTitle(menu.menu_title)}
          />
        </Box>
        {menu.desc ? (
          menu.content.length !== 0 ? (
            <Box
              fontSize="body1.fontSize"
              className={`desc-wrap ${classes.truncate} ${classes.desc}`}
              display="block"
            >
              {menu.content}
            </Box>
          ) : null
        ) : null}
      </Link>
    </ListItemButton>
  );
}

export default withStyles(styles)(NavListItem);
