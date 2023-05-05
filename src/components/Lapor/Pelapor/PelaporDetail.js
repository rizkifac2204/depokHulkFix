import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// utils
import { formatedDate } from "utils/formatDate";

// component
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import ContentLayout from "components/GlobalComponents/ContentLayout";

export default function PelaporDetailSection({ detail }) {
  return (
    <div>
      <CustomCard
        title={`Detail Pelapor`}
        caption={`Rincian Data ${detail.nama}`}
        showDivider={true}
      >
        <Grid container mt={4}>
          {/* pelapor  */}
          <Grid item xs={12}>
            <Box mb={2}>
              <Typography variant="h5">Identitas Pelapor</Typography>
            </Box>

            <ContentLayout title="a. Nama">
              : {detail.nama || "-"}
            </ContentLayout>
            <ContentLayout title="b. Tempat / Tanggal Lahir">
              : {detail.tempat_lahir || "-"}
              {` / `}
              {detail.tanggal_lahir
                ? formatedDate(detail.tanggal_lahir, false)
                : "-"}
            </ContentLayout>
            <ContentLayout title="c. Jenis Kelamin">
              : {detail.jenis_kelamin || "-"}
            </ContentLayout>
            <ContentLayout title="c. Jenis Kelamin">
              : {detail.jenis_kelamin || "-"}
            </ContentLayout>
            <ContentLayout title="d. Pekerjaan ">
              : {detail.pekerjaan || "-"}
            </ContentLayout>
            <ContentLayout title="e. Kewarganegaraan ">
              : {detail.kewarganegaraan || "Indonesia"}
            </ContentLayout>
            <ContentLayout title="f. Alamat">
              : {detail.alamat || "-"}
            </ContentLayout>
            <ContentLayout title="g. No.Telp/HP">
              : {detail.telp || "-"}
            </ContentLayout>
            <ContentLayout title="h. Email">
              : {detail.email || "-"}
            </ContentLayout>

            <Divider sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </CustomCard>
    </div>
  );
}
