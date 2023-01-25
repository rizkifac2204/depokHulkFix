import { Typography, Box, Grid } from "@mui/material";
// component
import CustomCard from "components/GlobalComponents/Card/CustomCard";

function ProfileUmum() {
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
              <Typography variant="h6">Live Stripe Account</Typography>
              <Typography variant="body2">
                to learn how to connect your payment processor
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="h6">Live Stripe Account</Typography>
              <Typography variant="body2">
                to learn how to connect your payment processor
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="h6">Live Stripe Account</Typography>
              <Typography variant="body2">
                to learn how to connect your payment processor
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box mb={2}>
              <Typography variant="h6">Live Stripe Account</Typography>
              <Typography variant="body2">
                to learn how to connect your payment processor
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="h6">Live Stripe Account</Typography>
              <Typography variant="body2">
                to learn how to connect your payment processor
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="h6">Live Stripe Account</Typography>
              <Typography variant="body2">
                to learn how to connect your payment processor
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CustomCard>
    </div>
  );
}

export default ProfileUmum;
