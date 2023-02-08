// lybrary
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import ProfileDetail from "components/Profile/ProfileDetail";

function SimpegEdit() {
  const queryClient = useQueryClient();
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

  function deleteCallback() {
    function onSuccess(data) {
      toast.success(data.message || "Sukses");
      queryClient.invalidateQueries(["users"]);
      setTimeout(() => {
        router.push(`/admin/simpeg`);
      }, 2000);
    }

    function onError(err) {
      toast.error(err.message);
    }

    return { onSuccess, onError };
  }

  if (isLoading) return <LinearProgress sx={{ height: "4px" }} />;
  if (isError)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`An error has occurred: ${error.message}`}</Alert>
    );

  if (!user.editable)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`Tidak Ada Izin Mengubah User Ini`}</Alert>
    );

  return (
    <>
      <Head>
        <title>{`Edit Pegawai - Bawaslu Depok  Apps`}</title>
      </Head>
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}></Grid>
            <Grid item lg={3}>
              {Object.keys(user).length !== 0 ? (
                <Box pt={3} sx={{ display: { xs: "none", lg: "block" } }}>
                  <ProfileDetail
                    profile={user}
                    isUser={true}
                    deleteCallback={deleteCallback}
                  />
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default SimpegEdit;
