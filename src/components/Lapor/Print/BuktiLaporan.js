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

const BuktiLaporan = React.forwardRef(({ detail }, ref) => {
  const textForQrCode = detail.nomor ? detail.nomor : "Belum Tersedia";
  return (
    <ThemeProvider theme={themeLight}>
      <Card sx={{ display: "none", displayPrint: "block", p: 2 }} ref={ref}>
        <Box sx={{ display: "flex", flexWrap: "nowrap", p: 2, mb: 2 }}>
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
          TANDA BUKTI LAPORAN
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                <TableCell colSpan={2}>
                  Laporan Dugaan Pelanggaran Pemilu Tahun 2024
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tempat Lapor</TableCell>
                <TableCell>
                  : <b>{detail.tempat_lapor}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tanggal</TableCell>
                <TableCell>
                  :{" "}
                  <b>
                    {formatedDate(detail?.tanggal_lapor, true)} Pukul{" "}
                    {detail.jam_lapor}
                  </b>
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

export default BuktiLaporan;
