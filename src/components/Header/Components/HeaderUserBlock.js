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
import Skeleton from "@mui/material/Skeleton";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useAuthContext } from "context/AuthContext";

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

function stringToColor(string) {
  let hash = 0;
  let i;

  if (!string) return;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (!name) return;
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function HeaderUserBlock(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { classes } = props;
  const { user, logout } = useAuthContext();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  if (!user) return <Skeleton variant="circular" width={40} height={40} />;

  return (
    <div>
      <Tooltip title={user.name} placement="bottom">
        <IconButton
          aria-describedby={open ? "simple-popper" : null}
          variant="contained"
          color="primary"
          style={{ padding: "6px" }}
          onClick={handleClick}
        >
          <Avatar className={classes.avatar} {...stringAvatar(user.name)} />
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
                  className={classes.large}
                  {...stringAvatar(user.name)}
                />
                <Typography variant="body2">{user.name}</Typography>
                <Typography variant="subtitle2">{user.nama_level}</Typography>
                <Button
                  className="btn primary-bg-btn"
                  component={Link}
                  href="/admin/profile/setting"
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                >
                  Pengaturan Akun
                </Button>
              </div>
            </ListSubheader>
          }
        >
          <ListItem
            component="div"
            className="top-dropdown-menu--item d-block text-center"
          >
            <Button
              color="primary"
              onClick={logout}
              className="primary-bg-btn"
              endIcon={<LogoutOutlinedIcon />}
            >
              Sign out
            </Button>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}

export default withStyles(styles)(HeaderUserBlock);
