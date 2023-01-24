import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Tooltip, Drawer, Button } from "@mui/material";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

// Component
import Layouts from "./Components/Layouts";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 260,
    flexShrink: 0,
  },
  CustomezerBtn: {
    fontSize: "1.125rem",
    height: "2.625rem",
    minWidth: "2.625rem",
    borderRadius: 0,
    padding: 0,
    zIndex: 99,
    right: -1,
    position: "fixed",
    top: 150,
  },
  // #262d37
  drawerWrap: {
    "& .customizer-wrap": {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

export default function CustomezerDrawer(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
    left: false,
  });
  const {
    toggleSidebar,
    toggleMiniSidebar,
    open,
    miniSidebarStatus,
    darkModeStatus,
    toggleDarkMode,
    toggleHorizontalMenu,
    horizontalMenuStatus,
    chooseTheme,
    rtlStatus,
    toggleRtl,
  } = props;
  const anchor = rtlStatus ? "left" : "right";
  const direction = !rtlStatus ? "left" : "right";
  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  return (
    <div className={classes.drawerWrap}>
      <Tooltip title="Customization" placement="top">
        <Button
          variant="contained"
          aria-label="settings"
          className={`custom-btn ${classes.CustomezerBtn}`}
          onClick={toggleDrawer(anchor, true)}
          color="primary"
        >
          <DisplaySettingsIcon color={props.iconColor} />
        </Button>
      </Tooltip>
      <Drawer
        className={`${classes.drawer} ${classes.drawerWrap}`}
        sx={{ zIndex: 1201 }}
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        SlideProps={{ direction: direction }}
      >
        <div className="customizer-wrap">
          <Layouts
            openStatus={open}
            toggleSidebar={toggleSidebar}
            toggleMiniSidebar={toggleMiniSidebar}
            miniSidebarStatus={miniSidebarStatus}
            darkModeStatus={darkModeStatus}
            toggleDarkMode={toggleDarkMode}
            toggleHorizontalMenu={toggleHorizontalMenu}
            horizontalMenuStatus={horizontalMenuStatus}
            chooseTheme={chooseTheme}
            rtlStatus={rtlStatus}
            toggleRtl={toggleRtl}
          />
        </div>
      </Drawer>
    </div>
  );
}
