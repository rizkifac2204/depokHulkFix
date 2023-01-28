import Head from "next/head";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import ProfileUmum from "components/Profile/ProfileUmum";
import ProfileDetail from "components/Profile/ProfileDetail";
import ProfileNomor from "components/Profile/ProfileNomor";
import ProfileBadan from "components/Profile/ProfileBadan";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Profile() {
  const {
    data: profile,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/profile`, { signal })
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
        <title>{`Profile - BWS Depok Apps`}</title>
      </Head>
      <Container>
        <Box px={{ xs: "12px", lg: 0 }} className="page-space">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={3}>
              <ProfileDetail profile={profile} />
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <ProfileUmum />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box mb={3}>
                <ProfileBadan />
              </Box>
              <Box mb={3}>
                <ProfileNomor />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Profile;
