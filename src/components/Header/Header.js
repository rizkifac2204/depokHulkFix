import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import { AppBar, Toolbar, Tooltip, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HorizontalMenu from "components/HorizontalMenu/HorizontalMenu.js";

//components
import GlobalSearch from "components/GlobalComponents/GlobalSearch";
import FullScreen from "./Components/FullScreen";
import Notification from "./Components/Notifications";
import HeaderUserBlock from "./Components/HeaderUserBlock";

import { drawerWidth, useRizkiContext } from "context/AppContext";
import useWindowSize from "utils/useWindowSize";

const styles = (theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth + "px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentJustify: {
    justifyContent: "space-between",
  },
  menuButton: {
    marginLeft: "-80px",
    color: theme.palette.common.white,
    marginRight: theme.spacing(2),
    "& .MuiSvgIcon-root": {
      fontSize: "1.8125rem",
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "-6px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "-7px",
    },
  },
  textLight: {
    color: theme.palette.text.primary,
  },
  ToggleBtn: {
    marginLeft: "-12px",
    color: theme.palette.text.primary,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  searchBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: "0 17px 0 35px",
    zIndex: 99,
    opacity: 0,
    visibility: "hidden",
    transform: "translateX(40px) scale(0.95)",
    transition: "all 0.2s ease 0s",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
    "& input": {
      fontSize: 22,
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 1px 0 15px",
    },
  },
  activeBar: {
    opacity: 1,
    visibility: "visible",
    transform: "translateX(0) scale(1)",
  },
  inputBar: {
    width: "calc(100% - 40px)",
    "& .MuiInputBase-root": {
      "&:before, &:after": {
        display: "none",
      },
    },
  },
  closeIcon: {
    width: 40,
  },
  horizontalHead: {
    "& .MuiToolbar-root": {
      paddingLeft: 0,
    },
  },
});

function Header(props) {
  const [init, action] = useRizkiContext();
  const [isSearch, setIsSearch] = useState(false);
  const size = useWindowSize();
  const { classes } = props;
  const {
    toggleSidebar,
    open,
    toggleResponsiveSidebar,
    openHorizontal,
    handleFullScreen,
  } = props;

  function showSearchBar() {
    setIsSearch(!isSearch);
  }
  return (
    <div className="hk-header">
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: size.width < 1280 ? false : open,
          [classes.horizontalHead]: openHorizontal,
          [`rtl-header`]: !open,
        })}
      >
        <Box>
          <GlobalSearch
            showSearchBar={() => showSearchBar()}
            className={clsx(
              classes.searchBar,
              { [classes.activeBar]: isSearch },
              "search-bar-wrap"
            )}
          />
        </Box>
        <Toolbar className={classes.contentJustify}>
          <Box display="flex" alignItems="center">
            {!openHorizontal ? (
              <IconButton
                sx={{ display: { xs: "none", md: "block" } }}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleSidebar}
                edge="start"
                className={clsx(
                  classes.menuButton,
                  {
                    [classes.ToggleBtn]: open === false,
                  },
                  "hamburger-icon"
                )}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <IconButton
              sx={{ display: { xs: "block", lg: "none" } }}
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleResponsiveSidebar}
              className={`${classes.menuButton} ham-menu ${classes.textLight}`}
            >
              <MenuIcon />
            </IconButton>
            {openHorizontal ? (
              <div>
                <Box
                  className="logo-wrap"
                  bgcolor="primary.main"
                  mr={2}
                  py="19px"
                  px={4}
                  lineHeight={0.8}
                >
                  <Box
                    component={Link}
                    href="/"
                    display="inline-block"
                    lineHeight={0.8}
                  >
                    <Image
                      src={`/Images/hulk-light.png`}
                      alt="site-logo"
                      width="95"
                      height="25"
                      priority
                    />
                  </Box>
                </Box>
              </div>
            ) : null}
            <Box>
              <Tooltip title="Search" placement="bottom">
                <IconButton
                  onClick={(e) => showSearchBar(e)}
                  variant="contained"
                  color="primary"
                  style={{ padding: "6px" }}
                >
                  <SearchIcon
                    className={classes.textLight}
                    style={{ transform: "scale(0.9)" }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            {!openHorizontal ? (
              <Box
                pl={2}
                className="mega-menu-wrap"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {/* <MegaMenu iconColor={classes.textLight} /> */}
              </Box>
            ) : null}
          </Box>
          <Box className="horizontal-icon" display="flex" alignItems="center">
            <Box className="h-btn-noti res-hide">
              <Notification iconColor={classes.textLight} />
            </Box>
            <Box
              sx={{ display: { xs: "none", md: "block" } }}
              className="h-btn-full-scr res-hide"
            >
              <FullScreen
                iconColor={classes.textLight}
                handleFullScreen={handleFullScreen}
              />
            </Box>
            <Box className="h-btn-user">
              <HeaderUserBlock />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {openHorizontal ? <HorizontalMenu /> : null}
    </div>
  );
}

export default withStyles(styles)(Header);
