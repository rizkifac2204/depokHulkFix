import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import clsx from "clsx";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

// MUI
import { Drawer, Box } from "@mui/material";
import { withStyles } from "@mui/styles";

import { drawerWidth, useRizkiContext } from "context/AppContext";

import {
  collapsedSidebarAction,
  miniSidebarAction,
  horizontalMenuAction,
  chooseThemeAction,
  darkModeAction,
} from "actions";

// Components
import Header from "components/Header/Header";
import Sidebar from "components/SideBar";
import IconSidebar from "components/IconSidebar";
import SidebarCustomization from "components/Customizer/Customization";
import NotificationSidebar from "components/NotificationSidebar/NotificationSidebar";

const styles = (theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  content: {
    paddingTop: 64,
    flexGrow: 1,
    marginLeft: -drawerWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      paddingTop: 52,
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuButton: {
    color: "red",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  bgColor: {
    backgroundColor: "#272e3d",
    borderRight: "0",
    overflowY: "hidden",
  },
  drawerPaper: {
    width: "100%",
    backgroundColor: "#272e3d",
    borderRight: "0",
    overflowY: "hidden",
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
  },
});

function DefaultLayout(props) {
  const { children, classes } = props;
  const [init, action] = useRizkiContext();
  const scroll = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    navCollapsed,
    isDarkModeActive,
    isMiniSidebarActive,
    isHorizontalMenuActive,
  } = init;

  const handleFullScreen = useFullScreenHandle();

  function getScrollBarStyle() {
    if (isHorizontalMenuActive) {
      return {
        height: "calc(100vh - 115px)",
      };
    } else {
      return {
        height: "calc(100vh - 64px)",
      };
    }
  }

  function renderPage() {
    const router = useRouter();
    const { pathname } = router;
    if (
      pathname === "/app/chat" ||
      pathname.startsWith("/app/email") ||
      pathname === "/app/todo" ||
      pathname === "/app/calendar"
    ) {
      return <div className="hulk-page-content">{children}</div>;
    }
    if (isMiniSidebarActive) {
      return <div className="hulk-page-content">{children}</div>;
    } else {
      return (
        <Scrollbars
          autoHide
          autoHideDuration={100}
          universal={true}
          ref={scroll}
          style={getScrollBarStyle()}
        >
          <div className="hulk-page-content">{children}</div>
        </Scrollbars>
      );
    }
  }

  function handleDrawerToggle() {
    setMobileOpen((prev) => !mobileOpen);
  }

  function onToggleNavCollapsed() {
    collapsedSidebarAction(action, !navCollapsed);
  }

  function onToggleDarkMode(isTrue) {
    if (isTrue) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    }
    darkModeAction(action, isTrue);
  }

  function onToggleMiniSidebar(isTrue) {
    if (isTrue) {
      document.body.classList.add("icon-layout-wrap");
      document.body.classList.remove("horizontal-layout");
      horizontalMenuAction(action, false);
      miniSidebarAction(action, true);
      collapsedSidebarAction(action, true);
    } else {
      document.body.classList.remove("icon-layout-wrap");
      miniSidebarAction(action, false);
      if (isHorizontalMenuActive === false) {
        collapsedSidebarAction(action, true);
      }
    }
  }

  function onToggleHorizontalMenu(isActive) {
    if (isActive) {
      document.body.classList.add("horizontal-layout");
      onToggleMiniSidebar(false);
      horizontalMenuAction(action, true);
      collapsedSidebarAction(action, false);
    } else {
      if (document.body.classList.contains("horizontal-layout")) {
        document.body.classList.remove("horizontal-layout");
        horizontalMenuAction(action, false);
      }
      if (isMiniSidebarActive === false) {
        collapsedSidebarAction(action, true);
      }
    }
  }

  function chooseTheme(theme) {
    document.body.classList.remove("light-theme", "teal-theme", "violet-theme");
    document.body.classList.add(theme);
    chooseThemeAction(action, theme);
  }

  return (
    <>
      <FullScreen handle={handleFullScreen}>
        {isMiniSidebarActive === false ? (
          <div className={`hk-app-layout ${classes.root}`}>
            <Header
              toggleResponsiveSidebar={handleDrawerToggle}
              open={navCollapsed}
              toggleSidebar={(e) => onToggleNavCollapsed(e)}
              openHorizontal={isHorizontalMenuActive}
              handleFullScreen={handleFullScreen}
            />
            <SidebarCustomization
              iconColor="#fff"
              open={navCollapsed}
              toggleSidebar={(e) => onToggleNavCollapsed(e)}
              darkModeStatus={isDarkModeActive}
              miniSidebarStatus={isMiniSidebarActive}
              toggleDarkMode={(e) => onToggleDarkMode(e)}
              toggleMiniSidebar={(e) => onToggleMiniSidebar(e)}
              horizontalMenuStatus={isHorizontalMenuActive}
              toggleHorizontalMenu={(e) => onToggleHorizontalMenu(e)}
              chooseTheme={(e) => chooseTheme(e)}
            />
            <NotificationSidebar />
            <nav aria-label="menu-sidebar">
              <Drawer
                sx={{ display: { xs: "block", lg: "none" } }}
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: `${classes.bgColor} ${classes.drawer}`,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <div>
                  <Sidebar closeSidebar={handleDrawerToggle} />
                </div>
              </Drawer>
              <div
                className={clsx(classes.drawer, {
                  [`rtl-sidebar`]: !navCollapsed,
                })}
              >
                <Drawer
                  sx={{ display: { xs: "none", md: "block" } }}
                  variant="persistent"
                  anchor="left"
                  open={navCollapsed}
                  classes={{
                    paper: ` ${classes.drawerPaper}`,
                  }}
                >
                  <Sidebar />
                </Drawer>
              </div>
            </nav>
            <main
              className={clsx(
                classes.content,
                {
                  [classes.contentShift]: navCollapsed,
                },
                "hk-main"
              )}
            >
              <div className="hk-page">{renderPage()}</div>
            </main>
          </div>
        ) : (
          <div className={`hk-icon-layout ${classes.root}`}>
            <SidebarCustomization
              iconColor="#fff"
              open={navCollapsed}
              toggleSidebar={(e) => onToggleNavCollapsed(e)}
              darkModeStatus={isDarkModeActive}
              miniSidebarStatus={isMiniSidebarActive}
              toggleDarkMode={(e) => onToggleDarkMode(e)}
              toggleMiniSidebar={(e) => onToggleMiniSidebar(e)}
              horizontalMenuStatus={isHorizontalMenuActive}
              toggleHorizontalMenu={(e) => onToggleHorizontalMenu(e)}
              chooseTheme={(e) => chooseTheme(e)}
            />
            <NotificationSidebar
              iconColor="#fff"
              open={navCollapsed}
              toggleSidebar={(e) => onToggleNavCollapsed(e)}
              darkModeStatus={isDarkModeActive}
              miniSidebarStatus={isMiniSidebarActive}
              toggleDarkMode={(e) => onToggleDarkMode(e)}
              toggleMiniSidebar={(e) => onToggleMiniSidebar(e)}
              horizontalMenuStatus={isHorizontalMenuActive}
              toggleHorizontalMenu={(e) => onToggleHorizontalMenu(e)}
            />
            <nav aria-label="menu-sidebar" className="icon-sidebar">
              <Drawer
                sx={{ display: { xs: "block", lg: "none" } }}
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: `${classes.bgColor} ${classes.drawer}`,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <div>
                  <Sidebar closeSidebar={handleDrawerToggle} />
                </div>
              </Drawer>
              <div className={`icon-drawer ${classes.drawer}`}>
                <Drawer
                  sx={{ display: { xs: "none", md: "block" } }}
                  variant="persistent"
                  anchor="left"
                  open={navCollapsed}
                  classes={{ paper: classes.drawerPaper }}
                >
                  <IconSidebar />
                </Drawer>
              </div>
            </nav>
            <main
              className={clsx(
                classes.content,
                {
                  [classes.contentShift]: navCollapsed,
                },
                "hk-main"
              )}
            >
              <Box className="icon-header-layout">
                <Header
                  toggleResponsiveSidebar={handleDrawerToggle}
                  open={navCollapsed}
                  toggleSidebar={(e) => onToggleNavCollapsed(e)}
                  openHorizontal={isHorizontalMenuActive}
                  handleFullScreen={handleFullScreen}
                />
              </Box>
              <div className="hk-page">{renderPage()}</div>
            </main>
          </div>
        )}
      </FullScreen>
    </>
  );
}

export default withStyles(styles)(DefaultLayout);
