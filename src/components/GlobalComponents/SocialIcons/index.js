import React, { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { Fab, Box, Icon } from "@mui/material";
import Image from "next/image";

// icons
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

const useStyles = makeStyles({
  root: {
    display: "inline-block",
  },
  fab: {
    fontSize: "1.75rem",
    marginLeft: "1px",
    backgroundColor: "transparent",
    boxShadow: "none !important",
    transition: "all 0.3s ease-out",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  facebook: {
    color: "#3c5a9a !important",
  },
  twitter: {
    color: "#1DA1F2 !important",
  },
  linked: {
    color: "#0073b1 !important",
  },
  insta: {
    color: "#9b3179 !important",
  },
});

export function SocialIcons() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Fab
        size="small"
        className={`${classes.fab} ${classes.facebook}`}
        disableRipple
        component={Link}
        href="#"
      >
        <FacebookOutlinedIcon />
      </Fab>
      <Fab
        size="small"
        className={`${classes.fab} ${classes.twitter}`}
        disableRipple
        component={Link}
        href="#"
      >
        <Image
          alt="Twitter"
          src="/Pictures/twitter.svg"
          width={20}
          height={20}
        />
      </Fab>
      <Fab
        size="small"
        className={`${classes.fab} ${classes.linked}`}
        disableRipple
        component={Link}
        href="#"
      >
        <Image
          alt="instagram"
          src="/Pictures/instagram.svg"
          width={20}
          height={20}
        />
      </Fab>
      <Fab
        size="small"
        className={`${classes.fab} ${classes.insta}`}
        disableRipple
        component={Link}
        href="#"
      >
        <Image alt="tiktok" src="/Pictures/tiktok.svg" width={20} height={20} />
      </Fab>
    </Box>
  );
}
