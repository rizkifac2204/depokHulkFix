import Image from "next/image";
import React, { Fragment } from "react";
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

import {
  WithDynamicImage,
  SetQRCode,
} from "components/GlobalComponents/Attributes";
// utils
import { formatedDate } from "utils/formatDate";

const themeLight = createTheme({
  palette: {
    mode: "light",
  },
});

const TemuanPrintData = React.forwardRef(({ detail }, ref) => {
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
          <Box sx={{ position: "relative" }}>FORMULIR MODEL B.2</Box>
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
          FORMULIR TEMUAN <br /> Nomor: {detail?.nomor}
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">
                    1. Identitas Pengawas yang menemukan
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>a. Nama</TableCell>
                <TableCell>
                  : <b>{detail?.nama}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>b. Jabatan</TableCell>
                <TableCell>
                  : <b>{detail?.jabatan}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>c. Alamat</TableCell>
                <TableCell>
                  : <b>{detail?.alamat}</b>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">2. Identitas Terlapor</Typography>
                </TableCell>
              </TableRow>

              {detail.terlapor.map((item, index) => (
                <Fragment key={index}>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="subtitle1">
                        Terlapor {index + 1}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a. Nama</TableCell>
                    <TableCell>
                      : <b>{item?.nama}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>b. Alamat</TableCell>
                    <TableCell>
                      : <b>{item?.alamat}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>c. Telp/HP</TableCell>
                    <TableCell>
                      : <b>{item?.telp}</b>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">
                    3. Peristiwa yang ditemukan
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>a. Peristiwa</TableCell>
                <TableCell>
                  : <b>{detail?.peristiwa}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>b. Tempat Kejadian</TableCell>
                <TableCell>
                  : <b>{detail?.tempat_kejadian}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>c. Hari dan Tanggal Kejadian</TableCell>
                <TableCell>
                  : <b>{formatedDate(detail.tanggal_kejadian, true)}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>c. Hari dan Tanggal Diketahui</TableCell>
                <TableCell>
                  : <b>{formatedDate(detail.tanggal_diketahui, true)}</b>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">4. Saksi-saksi</Typography>
                </TableCell>
              </TableRow>

              {detail.saksi.map((item, index) => (
                <Fragment key={index}>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="subtitle1">
                        Saksi {index + 1}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a. Nama</TableCell>
                    <TableCell>
                      : <b>{item?.nama}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>b. Alamat</TableCell>
                    <TableCell>
                      : <b>{item?.alamat}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>c. Telp/HP</TableCell>
                    <TableCell>
                      : <b>{item?.telp}</b>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">5. Bukti-bukti</Typography>
                </TableCell>
              </TableRow>

              {detail.bukti.map((item, index) => (
                <Fragment key={index}>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="subtitle1">
                        Bukti {index + 1}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a. Nama bukti</TableCell>
                    <TableCell>
                      : <b>{item?.keterangan}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      {item.file ? (
                        <WithDynamicImage
                          altText={item.keterangan}
                          image={item.file}
                        />
                      ) : null}
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">
                    6. Uraian Kejadian Singkat
                  </Typography>
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
                <TableCell colSpan={2}>
                  Depok, tanggal {formatedDate(detail.created_at, false)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  {detail.nama_bawaslu}
                  <SetQRCode
                    text={
                      process.env.NEXT_PUBLIC_HOST + "/temuan/" + textForQrCode
                    }
                  />
                  {detail.nama_admin}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ fontSize: 10, m: 1 }}>
          (Kode merupakan bukti Sah dari Sistem PPID Bawaslu <br /> selama dapat
          terbaca dan terscan dengan benar)
        </Box>
      </Card>
    </ThemeProvider>
  );
});

TemuanPrintData.displayName = "TemuanPrintData";
export default TemuanPrintData;
