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

import { WithDynamicImage } from "components/GlobalComponents/Attributes";
// utils
import { formatedDate } from "utils/formatDate";

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
                    3. Peristiwa yang dilaporkan
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
                      <WithDynamicImage
                        altText={item.keterangan}
                        image={item.file}
                      />
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}

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
            <Typography variant="body">Penerima Laporan</Typography>
            <br />
            <br />
            <br />
            <br />
            <br />
            ..............................
          </Box>
          <Box sx={{ position: "relative", width: 100, height: 90, mr: 3 }}>
            <Typography variant="body">Pelapor</Typography>
            <br />
            <br />
            <br />
            <br />
            <br />
            ..............................
          </Box>
        </Box>
      </Card>
    </ThemeProvider>
  );
});

LaporanPrintData.displayName = "LaporanPrintData";
export default LaporanPrintData;
