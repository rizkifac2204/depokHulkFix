import React from "react";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { Box, Button } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import SidebarContent from "./Components/SidebarContent";
import Image from "next/image";

import { drawerWidth } from "context/AppContext";
import { MenuContextProvider } from "context/MenuListContext";

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
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { closeSidebar } = props;

  return (
    <MenuContextProvider>
      <div>
        <div className="sidebar-wrap h-100">
          <div className={classes.drawerHeader}>
            <Box
              className="site-logo"
              display="inline-flex"
              alignItems="center"
            >
              <Box
                component={Link}
                href="/admin"
                className="logo-mini"
                lineHeight={0.8}
              >
                <Image
                  src={"/Images/logo-light.png"}
                  alt="logo"
                  width="90"
                  height="22"
                  priority
                />
              </Box>
            </Box>
          </div>
          <Scrollbars
            className="hulk-scroll"
            autoHide
            autoHideDuration={100}
            style={{ height: "calc(100vh - 125px" }}
          >
            <SidebarContent closeSidebar={closeSidebar}></SidebarContent>
          </Scrollbars>

          <Box
            p={2}
            className={`sidebar-footer ${classes.dFlex}`}
            borderTop="2px solid rgb(64, 72, 84)"
          >
            <div>
              <Box
                fontSize="body2.fontSize"
                color="primary.contrastText"
                className="text-dark"
                style={{ textTransform: "capitalize" }}
              >
                <Box
                  component="span"
                  mr={1}
                  className="icon far fa-clone mr-4"
                ></Box>
                Bantuan
              </Box>
              <Box
                component="span"
                className="text-dark"
                fontSize="0.8rem"
                color="#969fa4"
                mt="0.3125rem"
              >
                Penjelasan
              </Box>
            </div>
            <Button
              className={classes.smallBtn}
              size="small"
              variant="contained"
              component={Link}
              href="/admin/help"
            >
              Help
            </Button>
          </Box>
        </div>
      </div>
    </MenuContextProvider>
  );
}
