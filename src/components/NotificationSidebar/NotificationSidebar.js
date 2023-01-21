import { withStyles } from "@mui/styles";
import { Tooltip, Drawer, Button } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { useRizkiContext } from "context/AppContext";

// Component
import Tabs from "./Components/Tabs";

// Actions
import { notificationSidebarAction } from "actions";

const styles = (theme) => ({
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
    top: 200,
  },
});

function NotificationSidebar(props) {
  const { classes } = props;
  const [init, action] = useRizkiContext();
  const { notificationSidebar } = init;

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    notificationSidebarAction(action, !notificationSidebar);
  };
  return (
    <div>
      <Tooltip title="Notifications" placement="bottom">
        <Button
          variant="contained"
          aria-label="settings"
          className={`custom-btn ${classes.CustomezerBtn}`}
          onClick={toggleDrawer()}
          color="primary"
        >
          <HelpOutlineIcon color={props.iconColor} />
        </Button>
      </Tooltip>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={notificationSidebar}
        onClose={toggleDrawer()}
        sx={{ zIndex: 1201 }}
      >
        <Tabs />
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(NotificationSidebar);
