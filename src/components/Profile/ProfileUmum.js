import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// utils
import { formatedDate } from "utils/formatDate";

// component
import Wait from "components/GlobalComponents/Wait";
import CustomCard from "components/GlobalComponents/Card/CustomCard";

function ProfileUmum({ profile, isUser }) {
  let url, queryKey;
  if (isUser) {
    url = `/api/simpeg/${profile.id}/umum`;
    queryKey = ["user", profile.id, "umum"];
  } else {
    url = `/api/profile/umum`;
    queryKey = ["profile", "umum"];
  }

  const {
    data: umum,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKey,
    queryFn: ({ signal }) =>
      axios
        .get(url, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  if (isLoading) return <Wait loading={true} />;
  if (isError)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`An error has occurred: ${error}`}</Alert>
    );

  return (
    <div>
      <CustomCard
        title={`Informasi Umum`}
        caption="Detail Informasi Umum Profile"
        showDivider={true}
      >
        <Grid container mt={4}>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <Typography variant="subtitle2">Status</Typography>
              <Typography variant="body2">
                {umum.status_pegawai || "-"}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2">Jabatan</Typography>
              <Typography variant="body2">{umum.jabatan || "-"}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2">Gelar Depan</Typography>
              <Typography variant="body2">{umum.gelar_depan || "-"}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2">Gelar Belakang</Typography>
              <Typography variant="body2">
                {umum.gelar_belakang || "-"}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2">Jenis Kelamin</Typography>
              <Typography variant="body2">
                {umum.jenis_kelamin || "-"}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2">Agama</Typography>
              <Typography variant="body2">{umum.agama || "-"}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <Typography variant="subtitle2">Tempat Lahir</Typography>
              <Typography variant="body2">
                {umum.tempat_lahir || "-"}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2">Tanggal Lahir</Typography>
              <Typography variant="body2">
                {umum.tanggal_lahir
                  ? formatedDate(umum.tanggal_lahir, true)
                  : "-"}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2">Golongan Darah</Typography>
              <Typography variant="body2">
                {umum.golongan_darah || "-"}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2">Status Nikah</Typography>
              <Typography variant="body2">
                {umum.status_nikah || "-"}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2">Hobi</Typography>
              <Typography variant="body2">{umum.hobi || "-"}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2">Keahlian</Typography>
              <Typography variant="body2">{umum.keahlian || "-"}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CustomCard>
    </div>
  );
}

export default ProfileUmum;
