import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// component
import Wait from "components/GlobalComponents/Wait";
import CustomCard from "components/GlobalComponents/Card/CustomCard";

function DashboardPelanggaranTemuan({ data, isError, isLoading, error }) {
  if (isLoading) return <Wait loading={true} minHeight={100} />;
  if (isError)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`An error has occurred: ${error.message}`}</Alert>
    );

  return (
    <CustomCard title={"Data Temuan"} showDivider={true}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4}>
          <Box mt={2}>
            <Typography variant="h5">
              <b>{data?.jumlahTemuan || "0"}</b>
            </Typography>
            <Box>
              <Typography variant="caption">Jumlah Temuan</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Box mt={2}>
            <Typography variant="h5">
              <b>{data?.jumlahTerlapor || "0"}</b>
            </Typography>
            <Box>
              <Typography variant="caption">Jumlah Yang Dilaporkan</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </CustomCard>
  );
}

export default DashboardPelanggaranTemuan;
