import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// utils
import { formatedDate } from "utils/formatDate";

// component
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import ContentLayout from "components/GlobalComponents/ContentLayout";

export default function LaporDetailSection({ detail }) {
  return (
    <div>
      <CustomCard
        title={`Detail Laporan`}
        caption={`Rincian Laporan Nomor ${detail.nomor}`}
        showDivider={true}
      >
        <Grid container mt={4}>
          {/* pelapor  */}
          <Grid item xs={12}>
            <Box mb={2}>
              <Typography variant="h5">1. Identitas Pelapor</Typography>
            </Box>

            <ContentLayout title="a. Nama">
              : {detail.nama || "-"}
            </ContentLayout>
            <ContentLayout title="b. Tempat / Tanggal Lahir">
              : {detail.tempat_lahir || "-"}
              {` / `}
              {detail.tanggal_lahir
                ? formatedDate(detail.tanggal_lahir, true)
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

          {/* Terlapor  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">2. Identitas Terlapor</Typography>
            </Box>

            <Grid container>
              <Grid item xs={4}>
                <Typography variant="h6">Terlapor I</Typography>
                <ContentLayout title="Nama">
                  : {detail.nama || "-"}
                </ContentLayout>
                <ContentLayout title="Alamat">
                  : {detail.alamat || "-"}
                </ContentLayout>
                <ContentLayout title="Telp">
                  : {detail.telp || "-"}
                </ContentLayout>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="h6">Terlapor II</Typography>
                <ContentLayout title="Nama">
                  : {detail.nama || "-"}
                </ContentLayout>
                <ContentLayout title="Alamat">
                  : {detail.alamat || "-"}
                </ContentLayout>
                <ContentLayout title="Telp">
                  : {detail.telp || "-"}
                </ContentLayout>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="h6">Terlapor III</Typography>
                <ContentLayout title="Nama">
                  : {detail.nama || "-"}
                </ContentLayout>
                <ContentLayout title="Alamat">
                  : {detail.alamat || "-"}
                </ContentLayout>
                <ContentLayout title="Telp">
                  : {detail.telp || "-"}
                </ContentLayout>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* Peristiwa  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">3. Peristiwa yang dilaporkan</Typography>
            </Box>

            <ContentLayout title="a. Peristiwa">
              : {detail.peristiwa || "-"}
            </ContentLayout>
            <ContentLayout title="b. Tempat Kejadian">
              : {detail.tempat_kejadian || "-"}
            </ContentLayout>
            <ContentLayout title="c. Hari dan Tanggal Kejadian">
              :{" "}
              {detail.tanggal_kejadian
                ? formatedDate(detail.tanggal_kejadian, true)
                : "-"}
            </ContentLayout>
            <ContentLayout title="d. Hari dan Tanggal Diketahui">
              :{" "}
              {detail.tanggal_diketahui
                ? formatedDate(detail.tanggal_diketahui, true)
                : "-"}
            </ContentLayout>

            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* saksi-saksi  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">4. Saksi - saksi</Typography>
            </Box>

            <Grid container>
              <Grid item xs={4}>
                <Typography variant="h6">Saksi I</Typography>
                <ContentLayout title="Nama">
                  : {detail.nama || "-"}
                </ContentLayout>
                <ContentLayout title="Alamat">
                  : {detail.alamat || "-"}
                </ContentLayout>
                <ContentLayout title="Telp">
                  : {detail.telp || "-"}
                </ContentLayout>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="h6">Saksi II</Typography>
                <ContentLayout title="Nama">
                  : {detail.nama || "-"}
                </ContentLayout>
                <ContentLayout title="Alamat">
                  : {detail.alamat || "-"}
                </ContentLayout>
                <ContentLayout title="Telp">
                  : {detail.telp || "-"}
                </ContentLayout>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* bukti-bukti  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">5. Bukti</Typography>
            </Box>

            <Box>
              <ContentLayout title="Nama">: {detail.nama || "-"}</ContentLayout>
            </Box>

            <Box>
              <ContentLayout title="Nama">: {detail.nama || "-"}</ContentLayout>
            </Box>

            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* uraian  */}
          <Grid item xs={12} mt={2}>
            <Box>
              <Typography variant="h5">6. Uraian Kejadian</Typography>
            </Box>

            <Typography variant="body2">{detail.uraian || "-"}</Typography>

            <Divider sx={{ mt: 2 }} />
          </Grid>

          <Divider sx={{ mt: 2 }} />

          {/* Pelaporan  */}
          <Grid item xs={12} mt={2}>
            <Box mb={1}>
              <Typography variant="subtitle2">Dilaporkan di </Typography>
              <Typography variant="body2">
                {detail.tempat_lapor || "-"}
              </Typography>
            </Box>

            <Box mb={1}>
              <Typography variant="subtitle2">Hari dan Waktu </Typography>
              <Typography variant="body2">
                {detail.tanggal_lapor
                  ? formatedDate(detail.tanggal_lapor, true)
                  : "-"}{" "}
                Pukul {detail.jam_lapor || "-"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CustomCard>
    </div>
  );
}
