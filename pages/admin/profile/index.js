import { Grid, Box, Container } from "@mui/material";

import ProfileUmum from "components/Profile/ProfileUmum";
import ProfileDetail from "components/Profile/ProfileDetail";
import ProfileNomor from "components/Profile/ProfileNomor";
import ProfileBadan from "components/Profile/ProfileBadan";

function Profile() {
  return (
    <div className="hk-user-profile">
      <Container>
        <Box px={{ xs: "12px", lg: 0 }} className="page-space">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={3}>
              <ProfileDetail />
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
