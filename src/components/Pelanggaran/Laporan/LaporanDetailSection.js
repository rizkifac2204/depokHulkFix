import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// utils
import { formatedDate } from "utils/formatDate";

// component
import CustomCard from "components/GlobalComponents/Card/CustomCard";

import PelaporDetailSection from "../Pelapor/PelaporDetailSection";
import SectionTerlapor from "../Components/SectionTerlapor";
import SectionPeristiwa from "../Components/SectionPeristiwa";
import SectionSaksi from "../Components/SectionSaksi";
import SectionBukti from "../Components/SectionBukti";

export default function LaporanDetailSection({ detail, invalidateQueries }) {
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

            <PelaporDetailSection detail={detail} />
            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* Terlapor  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">2. Identitas Terlapor</Typography>
            </Box>

            <SectionTerlapor data={detail.terlapor} />
          </Grid>

          {/* Peristiwa  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">3. Peristiwa yang dilaporkan</Typography>
            </Box>

            <SectionPeristiwa detail={detail} />
          </Grid>

          {/* saksi-saksi  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">4. Saksi - saksi</Typography>
            </Box>

            <SectionSaksi data={detail.saksi} />
          </Grid>

          {/* bukti-bukti  */}
          <Grid item xs={12} mt={2}>
            <Box mb={2}>
              <Typography variant="h5">5. Bukti</Typography>
            </Box>

            <SectionBukti
              detail={detail}
              invalidateQueries={invalidateQueries}
              param="laporan"
            />
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
