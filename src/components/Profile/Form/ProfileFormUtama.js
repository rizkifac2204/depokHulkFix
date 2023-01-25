import { FormControl, TextField, Button, Avatar, Box } from "@mui/material";
// components
import ContentLayout from "components/GlobalComponents/ContentLayout";

function ProfileFormUtama() {
  return (
    <div className="hk-general-settings">
      <form>
        <Box mb={3}>
          <ContentLayout title="Level User">
            <FormControl fullWidth>
              <TextField
                disabled
                variant="standard"
                name="level"
                placeholder="Level"
                value="Abigail"
              />
            </FormControl>
          </ContentLayout>
        </Box>
        <Box mb={3}>
          <ContentLayout title="Nama">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="nama_admin"
                placeholder="Nama"
                value="Abigail"
              />
            </FormControl>
          </ContentLayout>
        </Box>
        <Box mb={3}>
          <ContentLayout title="Telp / HP">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="telp_admin"
                placeholder="Telp"
                value="0879"
              />
            </FormControl>
          </ContentLayout>
        </Box>
        <Box mb={3}>
          <ContentLayout title="Email">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="email_admin"
                placeholder="Email"
                value="apap@apac.com"
              />
            </FormControl>
          </ContentLayout>
        </Box>
        <Box mb={3}>
          <ContentLayout title="Username">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="email_admin"
                placeholder="Email"
                value="apap@apac.com"
              />
            </FormControl>
          </ContentLayout>
        </Box>
        <Box mb={3}>
          <ContentLayout>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className="primary-bg-btn"
            >
              Simpan
            </Button>
          </ContentLayout>
        </Box>
      </form>
    </div>
  );
}

export default ProfileFormUtama;
