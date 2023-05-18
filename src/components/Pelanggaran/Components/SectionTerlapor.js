import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// component
import ContentLayout from "components/GlobalComponents/ContentLayout";

function SectionTerlapor({ data }) {
  return (
    <>
      <Grid container>
        {data.length !== 0
          ? data.map((item, index) => (
              <Grid item xs={4} key={index}>
                <Typography variant="h6">Terlapor {index + 1}</Typography>
                <ContentLayout title="Nama">: {item.nama || "-"}</ContentLayout>
                <ContentLayout title="Alamat">
                  : {item.alamat || "-"}
                </ContentLayout>
                <ContentLayout title="Telp">: {item.telp || "-"}</ContentLayout>
              </Grid>
            ))
          : "Tidak Ada Terlapor"}
      </Grid>

      <Divider sx={{ mt: 2 }} />
    </>
  );
}

export default SectionTerlapor;
