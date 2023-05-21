import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
// component
import Wait from "components/GlobalComponents/Wait";
import CustomCard from "components/GlobalComponents/Card/CustomCard";

function DashboardUmum({ data, isError, isLoading, error, user }) {
  if (isLoading) return <Wait loading={true} minHeight={100} />;
  if (isError)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`An error has occurred: ${error.message}`}</Alert>
    );

  return (
    <>
      <CustomCard>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Box mr={1} className="icon-wrap">
              <PeopleOutlineIcon color="info" />
            </Box>
            <Box className="font-weight-med">Pengguna</Box>
          </Box>
          <Box>
            <Typography variant="h4" className="mb-0">
              <b>{data?.jumlahUser?.toLocaleString() || 0}</b>
            </Typography>
          </Box>
        </Box>
      </CustomCard>
      {user?.level < 5 && (
        <CustomCard mt={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Box mr={1} className="icon-wrap">
                <ElectricBoltIcon color="info" />
              </Box>
              <Box className="font-weight-med">Laporan Awal</Box>
            </Box>
            <Box>
              <Typography variant="h4" className="mb-0">
                <b>{data?.jumlahAwal?.toLocaleString() || "0"}</b>
              </Typography>
            </Box>
          </Box>
        </CustomCard>
      )}
    </>
  );
}

export default DashboardUmum;
