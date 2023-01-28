import React from "react";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { Box } from "@mui/material";
import SidebarContent from "./Components/SidebarContent";
import Image from "next/image";
const drawerWidth = 80;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#272e3d",
    borderRight: "0",
    overflowY: "hidden",
  },
  drawerHeader: {
    display: "flex",
    borderBottom: "1px solid #404854",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  dFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  smallBtn: {
    padding: "2px 5px",
    fontSize: "0.8rem",
  },
  avatar: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#404752",
  },
  size: {
    marginLeft: "auto",
    marginRight: "auto",
    height: 50,
    width: 50,
  },
}));

export default function IconSidebar(props) {
  const classes = useStyles();
  const { closeSidebar } = props;
  return (
    <div className="sidebar-wrap">
      <div className={classes.drawerHeader}>
        <Box
          className="site-logo"
          mx="auto"
          display="inline-flex"
          alignItems="center"
        >
          <Box component={Link} href="/admin" lineHeight={0.8}>
            <Image
              src={"/Pictures/logo-sm.png"}
              alt="site logo"
              width="27"
              height="30"
            />
          </Box>
        </Box>
      </div>
      <SidebarContent closeSidebar={closeSidebar}></SidebarContent>
    </div>
  );
}
