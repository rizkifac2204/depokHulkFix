import Head from "next/head";
import { useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { withStyles } from "@mui/styles";
import ProfileSidebarData from "./ProfileSidebarData";

const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: "auto",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
  },
  drawer: {
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginLeft: "7px  !important",
    // position: "absolute",
    // top: 25,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 0,
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
  },
  content: {
    flexGrow: 1,
    borderLeft: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  contentWrap: {
    position: "relative",
  },
});

const drawer = (
  <div>
    <ProfileSidebarData />
  </div>
);

function LayoutRiwayatDanKeluarga(props) {
  const { classes, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <>
      <Head>
        <title>{`Profile Data - BWS Depok Apps`}</title>
      </Head>
      <Box className="hk-mail-wrapper">
        <div className={classes.root}>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
              sx={{ display: { xs: "block", md: "none" }, zIndex: 1201 }}
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <div>
                <ProfileSidebarData closeSidebar={handleDrawerToggle} />
              </div>
            </Drawer>
            <Drawer
              sx={{ display: { xs: "none", md: "block" } }}
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </nav>

          <main className={classes.content}>
            <Box height="100%" className={classes.contentWrap}>
              <IconButton
                size="small"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={`email-btn ${classes.menuButton}`}
              >
                <MenuIcon />
              </IconButton>
              <div className="overview-section">{children}</div>
            </Box>
          </main>
        </div>
      </Box>
    </>
  );
}

export default withStyles(styles)(LayoutRiwayatDanKeluarga);
