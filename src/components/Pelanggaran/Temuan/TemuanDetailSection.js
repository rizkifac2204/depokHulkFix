import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// utils
import { formatedDate } from "utils/formatDate";

// component
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import ContentLayout from "components/GlobalComponents/ContentLayout";
import TemuanBukti from "./TemuanBukti";

export default function TemuanDetailSection({ detail }) {
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
              <Typography variant="h5">
                1. Data Pengawas yang menemukan
              </Typography>
            </Box>

            <ContentLayout title="a. Nama">
              : {detail.nama || "-"}
            </ContentLayout>
            <ContentLayout title="b. Jabatan">
              : {detail.jabatan || "-"}
            </ContentLayout>
            <ContentLayout title="c. Alamat">
              : {detail.alamat || "-"}
            </ContentLayout>

            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* Terlapor  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">2. Identitas Terlapor</Typography>
            </Box>

            <Grid container>
              {detail.saksi.length !== 0
                ? detail.terlapor.map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <Typography variant="h6">Terlapor {index + 1}</Typography>
                      <ContentLayout title="Nama">
                        : {item.nama || "-"}
                      </ContentLayout>
                      <ContentLayout title="Alamat">
                        : {item.alamat || "-"}
                      </ContentLayout>
                      <ContentLayout title="Telp">
                        : {item.telp || "-"}
                      </ContentLayout>
                    </Grid>
                  ))
                : "Tidak Ada Terlapor"}
            </Grid>

            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* Peristiwa  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">3. Peristiwa yang ditemukan</Typography>
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
              {detail.saksi.length !== 0
                ? detail.saksi.map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <Typography variant="h6">Saksi {index + 1}</Typography>
                      <ContentLayout title="Nama">
                        : {item.nama || "-"}
                      </ContentLayout>
                      <ContentLayout title="Alamat">
                        : {item.alamat || "-"}
                      </ContentLayout>
                      <ContentLayout title="Telp">
                        : {item.telp || "-"}
                      </ContentLayout>
                    </Grid>
                  ))
                : "Tidak Ada Saksi"}
            </Grid>

            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* bukti-bukti  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">5. Bukti</Typography>
            </Box>

            <Box>
              <TemuanBukti detail={detail} />
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
        </Grid>
      </CustomCard>
    </div>
  );
}
