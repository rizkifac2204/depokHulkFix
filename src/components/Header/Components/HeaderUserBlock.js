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
      <Tooltip title="User Profile" placement="bottom">
        <IconButton
          aria-describedby={open ? "simple-popper" : null}
          variant="contained"
          color="primary"
          style={{ padding: "6px" }}
          onClick={handleClick}
        >
          <Avatar alt={user.name} className={classes.avatar} src={user.image} />
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
                  alt={user.name}
                  className={classes.large}
                  src={user.image}
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
            <Button variant="contained" color="primary" onClick={logout}>
              Sign out
            </Button>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}

export default withStyles(styles)(HeaderUserBlock);
