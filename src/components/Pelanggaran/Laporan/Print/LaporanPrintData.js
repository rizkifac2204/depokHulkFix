import Image from "next/image";
import React from "react";
// mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// utils
import { formatedDate } from "utils/formatDate";
// components
import { SetQRCode } from "components/GlobalComponents/Attributes";
import PrintSectionTerlapor from "components/Pelanggaran/Components/PrintSectionTerlapor";
import PrintSectionPeristiwa from "components/Pelanggaran/Components/PrintSectionPeritiwa";
import PrintSectionSaksi from "components/Pelanggaran/Components/PrintSectionSaksi";
import PrintSectionBukti from "components/Pelanggaran/Components/PrintSectionBukti";

const themeLight = createTheme({
  palette: {
    mode: "light",
  },
});

const LaporanPrintData = React.forwardRef(({ detail }, ref) => {
  const textForQrCode = detail.nomor ? detail.nomor : "Belum Tersedia";
  return (
    <ThemeProvider theme={themeLight}>
      <Card sx={{ display: "none", displayPrint: "block" }} ref={ref}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            flexWrap: "nowrap",
            p: 2,
            mb: 2,
          }}
        >
          <Box sx={{ position: "relative" }}>FORMULIR MODEL B.1</Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "nowrap", px: 2, mb: 2 }}>
          <Box sx={{ position: "relative", width: 100, height: 90, mr: 3 }}>
            <Image
              src="/Pictures/logo-buttom.png"
              alt="Logo"
              fill
              priority
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </Box>
          <Box>
            <Typography variant="h5">
              <b>BADAN PENGAWAS PEMILIHAN UMUM</b>
            </Typography>
            <Typography>
              {`Jl. Karya Pemuda No.2, RT.02/RW.04, Kecamatan Beji, Kota Depok,
              Jawa Barat 16422`}
              <br />
              {`(021) 77809761`} / {`bawaslukotadepok@gmail.com`}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" align="center">
          FORMULIR LAPORAN <br /> Nomor: {detail?.nomor}
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">1. Identitas Pelapor</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>a. Nama</TableCell>
                <TableCell>
                  : <b>{detail?.nama}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>b. Tempat / Tanggal Lahir</TableCell>
                <TableCell>
                  :{" "}
                  <b>
                    {detail?.tempat_lahir} /{" "}
                    {formatedDate(detail.tanggal_lahir, false)}
                  </b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>c. Jenis Kelamin</TableCell>
                <TableCell>
                  : <b>{detail?.jenis_kelamin}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>d. Pekerjaan</TableCell>
                <TableCell>
                  : <b>{detail?.pekerjaan}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>e. Kewarganegaraan</TableCell>
                <TableCell>
                  : <b>{detail?.kewarganegaraan}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>f. Alamat</TableCell>
                <TableCell>
                  : <b>{detail?.alamat}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>g. No Telp/HP</TableCell>
                <TableCell>
                  : <b>{detail?.telp}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>h. Email</TableCell>
                <TableCell>
                  : <b>{detail?.telp}</b>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">2. Identitas Terlapor</Typography>
                </TableCell>
              </TableRow>

              <PrintSectionTerlapor data={detail.terlapor} />

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">
                    3. Peristiwa yang dilaporkan
                  </Typography>
                </TableCell>
              </TableRow>

              <PrintSectionPeristiwa detail={detail} />

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">4. Saksi-saksi</Typography>
                </TableCell>
              </TableRow>

              <PrintSectionSaksi data={detail.saksi} />

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">5. Bukti-bukti</Typography>
                </TableCell>
              </TableRow>

              <PrintSectionBukti data={detail.bukti} />

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">6. Uraian Kejadian</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <b>{detail?.uraian}</b>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Box my={2}></Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Dilaporkan di</TableCell>
                <TableCell>
                  : <b>{detail?.tempat_lapor}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hari dan Tanggal</TableCell>
                <TableCell>
                  : <b>{formatedDate(detail.tanggal_lapor, true)}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pukul</TableCell>
                <TableCell>
                  : <b>{detail?.jam_lapor}</b>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Box my={2}></Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  Saya menyatakan bahwa isi laporan ini adalah yang
                  sebenar-benarnya dan saya bersedia mempertanggungjawabkannya
                  di hadapan hukum.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={5} sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Box>
            <Typography variant="body">{detail.nama_bawaslu}</Typography>
            <Box sx={{ ml: -3 }}>
              <SetQRCode
                text={
                  process.env.NEXT_PUBLIC_HOST + "/laporan/" + textForQrCode
                }
              />
            </Box>
            {detail.nama_admin}
          </Box>
          <Box sx={{ position: "relative", width: 100, height: 90, mr: 3 }}>
            <Typography variant="body">Pelapor</Typography>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {detail.nama}
          </Box>
        </Box>
        <Box sx={{ fontSize: 10, m: 1 }}>
          (Kode merupakan bukti Sah dari Sistem Bawaslu Kota Depok <br /> selama
          dapat terbaca dan terscan dengan benar)
        </Box>
      </Card>
    </ThemeProvider>
  );
});

LaporanPrintData.displayName = "LaporanPrintData";
export default LaporanPrintData;
