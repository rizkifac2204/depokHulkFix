import { useState } from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  Typography,
  Popover,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

// components
import NotificationsTabs from "./NotificationsTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 530,
    maxWidth: 530,
    padding: 0,
    "& .text-badge": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      padding: "2px 5px",
      fontSize: 12,
      fontWeight: 400,
      borderRadius: 3,
      marginLeft: 10,
    },
    "& .top-dropdown-menu--item": {
      padding: 0,
    },
  },
}));

export default function Notifications(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Notifications" placement="bottom">
        <IconButton
          aria-describedby={open ? "notifications" : null}
          variant="contained"
          color="primary"
          style={{ padding: "6px" }}
          onClick={handleClick}
        >
          <NotificationsNoneIcon className={props.iconColor} />
        </IconButton>
      </Tooltip>
      <Popover
        id="notifications"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List
          className={`${classes.root} top-dropdown-menu`}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <div className="dropdown-header text-center">
                <Typography variant="body2">Notifications</Typography>
              </div>
            </ListSubheader>
          }
        >
          <Divider></Divider>
          <ListItem component="div" className="top-dropdown-menu--item">
            <NotificationsTabs />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
