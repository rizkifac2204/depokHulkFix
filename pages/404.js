import React from "react";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Grid, Typography, Box, Fab, Tooltip, Container } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  btn: {
    background: "rgba(0,0,0,0.1)",
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    boxShadow: "none",
  },
}));

function NotFound() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className="page-404">
      <div className="page-space-top">
        <Container>
          <Box className="">
            <Grid
              container
              justify="center"
              alignItems="center"
              spacing={3}
              className="text-center"
            >
              <Grid item xs={12} className="">
                <div className="page-404-img">
                  <Image
                    src={"/Pictures/404-img.png"}
                    alt="site logo"
                    width={500}
                    height={300}
                    priority
                  />
                </div>
                <div className="page-404-content">
                  <Typography variant="h5">Not Found</Typography>
                  <Typography variant="body2">
                    Link atau halaman yang anda tuju tidak tersedia
                  </Typography>
                  <Box mt={3}>
                    <Tooltip title="Previous Page" placement="bottom">
                      <Fab
                        aria-label="arrow_back"
                        className={classes.btn}
                        onClick={() => router.back()}
                      >
                        <Box fontSize="35px" className="material-icons">
                          arrow_back
                        </Box>
                      </Fab>
                    </Tooltip>
                    <Tooltip title="Home" placement="bottom">
                      <Fab
                        aria-label="home"
                        className={classes.btn}
                        component={Link}
                        href="/"
                      >
                        <Box fontSize="35px" className="material-icons">
                          home
                        </Box>
                      </Fab>
                    </Tooltip>
                    <Tooltip title="Search" placement="bottom">
                      <Fab
                        aria-label="search"
                        className={classes.btn}
                        component={Link}
                        href="/"
                      >
                        <Box fontSize="35px" className="material-icons">
                          search
                        </Box>
                      </Fab>
                    </Tooltip>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}

NotFound.fullPage = true;
export default NotFound;
