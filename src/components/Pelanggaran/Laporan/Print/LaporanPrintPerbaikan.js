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

import { SetQRCode } from "components/GlobalComponents/Attributes";
// utils
import { formatedDate } from "utils/formatDate";

const themeLight = createTheme({
  palette: {
    mode: "light",
  },
});

const LaporanPrintPerbaikan = React.forwardRef(({ detail }, ref) => {
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
          <Box sx={{ position: "relative" }}>FORMULIR MODEL B.3.1</Box>
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

        <Typography variant="h5" align="center">
          TANDA BUKTI PERBAIKAN LAPORAN <br />
          Nomor {detail.nomor}
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>Telah Diterima Dari :</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>
                  : <b>{detail?.nama}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tempat / Tanggal Lahir</TableCell>
                <TableCell>
                  :{" "}
                  <b>
                    {detail?.tempat_lahir} /{" "}
                    {detail?.tanggal_lahir
                      ? formatedDate(detail.tanggal_lahir, false)
                      : "-"}{" "}
                  </b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alamat</TableCell>
                <TableCell>
                  : <b>{detail?.alamat}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Telp</TableCell>
                <TableCell>
                  : <b>{detail?.telp}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tempat Lapor</TableCell>
                <TableCell>
                  : <b>{detail.tempat_lapor}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hari dan Tanggal</TableCell>
                <TableCell>
                  : <b>{formatedDate(detail?.tanggal_lapor, true)}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Waktu</TableCell>
                <TableCell>
                  : <b>{detail.jam_lapor}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Box my={2}>
                    Terkait dengan Laporan dugaan pelanggaran Pemilu Tahun 2024
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box>
          <SetQRCode
            text={process.env.NEXT_PUBLIC_HOST + "/laporan/" + textForQrCode}
          />
          <Box sx={{ fontSize: 10, m: 1 }}>
            (Kode merupakan bukti Sah dari Sistem PPID Bawaslu <br /> selama
            dapat terbaca dan terscan dengan benar)
          </Box>
        </Box>
      </Card>
    </ThemeProvider>
  );
});

LaporanPrintPerbaikan.displayName = "LaporanPrintPerbaikan";
export default LaporanPrintPerbaikan;
