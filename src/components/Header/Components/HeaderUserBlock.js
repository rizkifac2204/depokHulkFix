import { useRef, useState } from "react";
import Link from "next/link";
import { withStyles } from "@mui/styles";
import {
  IconButton,
  List,
  ListItem,
  Button,
  ListSubheader,
  Typography,
  Popover,
  Tooltip,
  Avatar,
} from "@mui/material";

const styles = (theme) => ({
  root: {
    width: "100%",
    minWidth: 300,
    padding: 0,
    "& >a": {
      color: theme.palette.text.primary,
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.05)",
      },
    },
    "& .top-dropdown-menu--item": {
      padding: "20px 12px",
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatar: {
    "@media (max-width:1560px)": {
      width: 35,
      height: 35,
    },
  },
});

function HeaderUserBlock(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { classes } = props;

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function logoutUser() {
    setAnchorEl(null);
    console.log("logout");
    // hulkLogoutUserFirebase();
  }

  return (
    <div>
      <Tooltip title="User Profile" placement="bottom">
        <IconButton
          aria-describedby={open ? "simple-popper" : null}
          variant="contained"
          color="primary"
          style={{ padding: "6px" }}
          onClick={handleClick}
        >
          <Avatar
            alt="user-thumb"
            className={classes.avatar}
            src={`/Images/avatars/user-4.jpg`}
          />
        </IconButton>
      </Tooltip>
      <Popover
        id="simple-popper"
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
              <div className="dropdown-header user-info  text-center">
                <Avatar
                  alt="user-thumb"
                  className={classes.large}
                  src={`/Images/avatars/user-4.jpg`}
                />
                <Typography variant="body2">Abigail Doe</Typography>
                <Typography variant="subtitle2">Associate Manager</Typography>
                <Button
                  className="btn primary-bg-btn"
                  component={Link}
                  href="/app/user-settings"
                  variant="outlined"
                  color="primary"
                >
                  Manage your account
                </Button>
              </div>
            </ListSubheader>
          }
        >
          <ListItem
            component="div"
            className="top-dropdown-menu--item d-block text-center"
          >
            <Button variant="contained" color="primary" onClick={logoutUser}>
              Sign out
            </Button>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}

export default withStyles(styles)(HeaderUserBlock);
