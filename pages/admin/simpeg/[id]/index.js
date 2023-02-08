// lybrary
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import SimpegDetail from "components/Simpeg/SimpegDetail";
import ProfileUmum from "components/Profile/ProfileUmum";
import ProfileBadan from "components/Profile/ProfileBadan";
import ProfileNomor from "components/Profile/ProfileNomor";

function SimpegView() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: user,
    isError,
    isLoading,
    error,
  } = useQuery({
    enabled: !!id,
    queryKey: ["user", id],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/simpeg/${id}`, { signal })
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
    <div className="hk-user-profile">
      <Head>
        <title>{`Detail Pegawai - Bawaslu Depok Apps`}</title>
      </Head>
      <Container>
        <Box px={{ xs: "12px", lg: 0 }} className="page-space">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8}>
              <SimpegDetail user={user} />
              <ProfileUmum profile={user} isUser={true} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Box mb={3}>
                <ProfileBadan profile={user} isUser={true} />
              </Box>
              <Box mb={3}>
                <ProfileNomor profile={user} isUser={true} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default SimpegView;
