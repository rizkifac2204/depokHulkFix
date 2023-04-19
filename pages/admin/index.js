import * as React from "react";
import Head from "next/head";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Grid,
  CircularProgress,
  Button,
  List,
  Card,
  ListItem,
} from "@mui/material";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

import CustomCard from "components/GlobalComponents/Card/CustomCard";

import { useAuthContext } from "context/AuthContext";

function Dashboard() {
  const { user } = useAuthContext();
  const {
    data: dashboard,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/dashboard`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  if (isLoading) return <LinearProgress sx={{ height: "4px" }} />;
  if (isError)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`An error has occurred: ${error.message}`}</Alert>
    );

  return (
    <>
      <Head>
        <title>{`Dashboard - Bawaslu Depok  Apps`}</title>
      </Head>

      <div className="webanalyics-dashboard">
        <Container maxWidth={false}>
          <Box px={2} pt={4} pb={3}>
            <Typography variant="h3">Halo {user?.name || "admin"}</Typography>
            <Typography variant="body2" color="textSecondary">
              Selamat datang di Aplikasi <b>Pelaporan</b> Bawaslu
            </Typography>
          </Box>

          <Grid container spacing={3} className="welcome-stat">
            <Grid item xs={12} sm={12} md={4}>
              <CustomCard>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center">
                    <Box mr={1} className="icon-wrap">
                      <PeopleOutlineIcon color="info" />
                    </Box>
                    <Box className="font-weight-med">Pengguna</Box>
                  </Box>
                  <Box>
                    <Typography variant="h4" className="mb-0">
                      {dashboard?.jumlahUser || "-"}
                    </Typography>
                  </Box>
                </Box>
              </CustomCard>
            </Grid>

            <Grid item xs={12} sm={12} md={8}>
              <CustomCard title={"Data Laporan"} showDivider={true}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Box mt={2}>
                      <Typography variant="h5">
                        {dashboard?.jumlahLaporan || "-"}
                      </Typography>
                      <Box>
                        <Typography variant="caption">
                          Jumlah Laporan
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Box mt={2}>
                      <Typography variant="h5">
                        {dashboard?.jumlahPelapor || "-"}
                      </Typography>
                      <Box>
                        <Typography variant="caption">
                          Jumlah Pelapor
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Box mt={2}>
                      <Typography variant="h5">
                        {dashboard?.jumlahTerlapor || "-"}
                      </Typography>
                      <Box>
                        <Typography variant="caption">
                          Jumlah Yang Dilaporkan
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
