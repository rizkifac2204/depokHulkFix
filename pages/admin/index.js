import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// context
import { useAuthContext } from "context/AuthContext";
//Component
import DashboardUmum from "components/Dashboard/Umum";
import DashboardPelanggaranLaporan from "components/Dashboard/Pelanggaran/Laporan";
import DashboardPelanggaranTemuan from "components/Dashboard/Pelanggaran/Temuan";

function Dashboard() {
  const { user } = useAuthContext();
  const {
    data: umum,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard", "umum"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/dashboard/umum`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const {
    data: laporan,
    isError: isErrorLaporan,
    isLoading: isLoadingLaporan,
    error: errorLaporan,
  } = useQuery({
    queryKey: ["dashboard", "pelanggaran", "laporan"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/dashboard/pelanggaran/laporan`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const {
    data: temuan,
    isError: isErrorTemuan,
    isLoading: isLoadingTemuan,
    error: errorTemuan,
  } = useQuery({
    queryKey: ["dashboard", "pelanggaran", "temuan"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/dashboard/pelanggaran/temuan`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  return (
    <>
      <Head>
        <title>{`Dashboard - Bawaslu Depok Apps`}</title>
      </Head>

      <div className="webanalyics-dashboard">
        <Container maxWidth={false}>
          <Box px={2} pt={4} pb={3}>
            <Typography variant="h3">
              Halo {user?.name || "administrator"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Selamat datang di Aplikasi <b>Pelaporan</b> Bawaslu
            </Typography>
          </Box>

          <Grid container spacing={3} className="welcome-stat">
            <Grid item xs={12} sm={12} md={4}>
              <DashboardUmum
                user={user}
                data={umum}
                isError={isError}
                isLoading={isLoading}
                error={error}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <DashboardPelanggaranLaporan
                    data={laporan}
                    isError={isErrorLaporan}
                    isLoading={isLoadingLaporan}
                    error={errorLaporan}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DashboardPelanggaranTemuan
                    data={temuan}
                    isError={isErrorTemuan}
                    isLoading={isLoadingTemuan}
                    error={errorTemuan}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
