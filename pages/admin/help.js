import { useState } from "react";
import Head from "next/head";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import CustomCard from "components/GlobalComponents/Card/CustomCard";

function Help() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Head>
        <title>{`Bantuan - Bawaslu Depok Apps`}</title>
      </Head>
      <SmallTitleBar title={`Batuan Aplikasi`} />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <CustomCard
            title={`Bantuan`}
            caption={`Penjelasan Aplikasi`}
            showDivider={true}
          >
            <Box mt={2}>
              {/* Level  */}
              <Accordion
                expanded={expanded === "level"}
                onChange={handleChange("level")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="level-content"
                  id="level-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Level
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Dalam aplikasi ini terdapat beberapa level yang akan
                    memberikan akses berbeda-beda tergantung dari level yang
                    dimiliki oleh user, yaitu:
                  </Typography>
                  <ul>
                    <li>Admin</li>
                    <li>Kabupaten/Kota</li>
                    <li>Kecamatan</li>
                    <li>Pengawas Kelurahan/Desa</li>
                    <li>PTPS</li>
                  </ul>
                  <Typography>
                    Maksud dari Akses akan dijelaskan berjalan dengan penjelasan
                    setiap menu dibawah
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/* verifikator  */}
              <Accordion
                expanded={expanded === "verifikator"}
                onChange={handleChange("verifikator")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="verifikator-content"
                  id="verifikator-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Verifikator
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Pada dasarnya, aplikasi ini di buat berdasarkan level yang
                    dimaksukan agar data dari setiap user akan
                    evaluasi/review/manajement oleh user lain yang satu tingkat
                    diatasnya.
                  </Typography>
                  <Typography>
                    Namun ada juga satu akses khusus agar user dapat
                    evaluasi/review/manajement data user yang levelnya sama,
                    selanjutnya disebut sebagai verifikator. tapi verifikator
                    tidak dapat mengelola data jika lintas wilayah.
                  </Typography>
                  <Typography>
                    Contoh kasusnya adalah data yang diinput oleh user kecamatan
                    dapat dikelola oleh verifikator {`(level sama)`} di
                    kecamatannya sendiri. namun verifikator tidak dapat
                    mengelola user lain yang levelnya sama tapi berbeda
                    kecamatan
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/* profile  */}
              <Accordion
                expanded={expanded === "profile"}
                onChange={handleChange("profile")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="profile-content"
                  id="profile-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Profile
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ol>
                    <li>Setiap user melengkapi data di halaman profile</li>
                    <li>
                      Data profile dapat diubah pada formulir yang akan dibagi
                      sesuia kategori
                    </li>
                    <li>
                      Kategori yang dimaksud adalah
                      <ul>
                        <li>
                          <b>Form Utama</b> : Data utama yang diperlukan sistem
                        </li>
                        <li>
                          <b>Form Infomrasi Umum </b>: Data umum dari user
                          seperi Jabatan, Gelar, Jenis Kelamin, Tanggal Lahir,
                          dll
                        </li>
                        <li>
                          <b>Form Alamat</b> : Merupakan data alaman lengkat
                          user
                        </li>
                        <li>
                          <b>Form Keterangan Badan</b> : Merupakan data
                          keterangan badan user seperi tinggi badan, nomor baju,
                          dll
                        </li>
                        <li>
                          <b>Form Informasi Lainnya</b> : merupakan data nomor
                          KTP, Nomor BPJS, NPWP, dll
                        </li>
                        <li>
                          <b>Form Keamanan</b> : Merupakan formulir untuk
                          merubah password
                        </li>
                      </ul>
                    </li>
                    <li>
                      Khusus data Riwayat dan Keluarga, user dapat menginput
                      data namun perlu direview oleh verifikator untuk validasi
                      *
                    </li>
                  </ol>
                  <Typography variant="caption">
                    <i>* Belum tersedia / tidak diperlukan</i>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/* kepegawaian  */}
              <Accordion
                expanded={expanded === "kepegawaian"}
                onChange={handleChange("kepegawaian")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="kepegawaian-content"
                  id="kepegawaian-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Kepegawaian
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <b>Simpeg</b> <br />
                    Merupakan daftar <b>Semua</b> pegawai yang terdaftar,
                    terdapat beberapa aksi yang dapat dilakukan
                  </Typography>
                  <ol>
                    <li>Lihat Detail Pegawai</li>
                    <li>Edit Pegawai *</li>
                    <li>Hapus Pegawai *</li>
                  </ol>
                  <Typography>
                    <b>Tambah Pegawai</b> <br />
                    Merupakan formulir untuk memasukan data pegawai baru dengan
                    ketentuan sebagai berikut
                  </Typography>
                  <ol>
                    <li>Admin dapat menginput semua level user</li>
                    <li>
                      Bawaslu Kabupaten/Kota <b>{`(Verifikator)`}</b> dapat
                      menginput mulai dari user Kabupaten/Kota
                    </li>
                    <li>
                      Bawaslu Kabupaten/Kota <b>{`(Bukan Verifikator)`} </b>
                      dapat menginput mulai dari user kecamatan
                    </li>
                    <li>
                      Panwascam <b>{`(Verifikator)`}</b> dapat menginput user
                      kecamatan dan PKD pada kecamatannya sendiri
                    </li>
                    <li>
                      Panwascam <b>{`(Bukan Verifikator)`}</b> dapat menginput
                      user PKD pada kecamatannya sendiri
                    </li>
                  </ol>
                  <Typography variant="caption">
                    <i>
                      * Khusus user lebih tinggi atau verifikator pada wilayah
                      yang sama
                    </i>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/* pelanggaran  */}
              <Accordion
                expanded={expanded === "pelanggaran"}
                onChange={handleChange("pelanggaran")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="pelanggaran-content"
                  id="pelanggaran-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Pelanggaran
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <b>Laporan</b> <br />
                    Merupakan data laporan yang pernah diinput, berikut
                    merupakan aksi yang dapat dilakukan
                  </Typography>
                  <ol>
                    <li>Melihat list data *</li>
                    <li>
                      Lihat detail, Dengan aksi **
                      <ul>
                        <li>Upload bukti</li>
                        <li>Print data</li>
                        <li>Print tanda terima</li>
                        <li>Print tanda perbaikan</li>
                        <li>
                          Upload Berkas Seperti Form B.3, B.4, B.5 - B.21 dll
                        </li>
                      </ul>
                    </li>
                    <li>Hapus Data **</li>
                    <li>Tambah Data Pada Formulit B.1</li>
                    <li>
                      Data Pelapor akan disimpan dan dapat dilihat pada menu{" "}
                      <b>Pelapor</b>
                    </li>
                  </ol>
                  <Typography>
                    <b>Temuan</b> <br />
                    Merupakan data temuan yang pernah diinput, berikut merupakan
                    aksi yang dapat dilakukan
                  </Typography>
                  <ol>
                    <li>Melihat list data *</li>
                    <li>
                      Lihat detail, Dengan aksi **
                      <ul>
                        <li>Upload bukti</li>
                        <li>Print data</li>
                        <li>
                          Upload Berkas Seperti Form B.3, B.4, B.5 - B.21 dll
                        </li>
                      </ul>
                    </li>
                    <li>Hapus Data **</li>
                    <li>Tambah Data Pada Formulit B.2</li>
                  </ol>
                  <Typography variant="caption">
                    <i>
                      * Data yang muncul adalah data yang diinput oleh diri
                      sendiri, atau data yang diinput oleh user dengan level
                      dibawah, atau user dengan level sama namun anda sebagai
                      verifikator
                    </i>
                    <br />
                    <i>
                      ** Aksi dapat dilakukan jika data diinput oleh diri
                      sendiri, atau data yang diinput oleh user dengan level
                      dibawah, atau user dengan level sama namun anda sebagai
                      verifikator
                    </i>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/* notes  */}
              <Accordion
                expanded={expanded === "notes"}
                onChange={handleChange("notes")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="notes-content"
                  id="notes-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Notes
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <b>Pribadi</b> <br />
                    Merupakan data catatan yang pernah diinput oleh diri
                    sendiri, aksi yang dapat dilakukan adalah
                  </Typography>
                  <ol>
                    <li>Lihat detail catatan</li>
                    <li>Hapus catatan</li>
                    <li>Bagikan catatan</li>
                    <li>Copy Link *</li>
                  </ol>
                  <Typography>
                    <b>Publik</b> <br />
                    Merupakan data catatan yang dibagikan, aksi yang dapat
                    dilakukan adalah
                  </Typography>
                  <ol>
                    <li>Lihat detail catatan</li>
                    <li>Copy Link</li>
                    <li>Membatakan Bagikan **</li>
                    <li>Hapus catatan **</li>
                  </ol>
                  <Typography>
                    Link yang sudah di Copy, dapat digunakan untuk melihat
                    catatan oleh user maupun orang lain{" "}
                    {`(Bukan Pengguna Aplikasi)`} karena catatan akan tampil
                    diluar dari pada halaman admin {`(Tanpa Login)`} Secara
                    cepat
                  </Typography>
                  <br />
                  <Typography variant="caption">
                    <i>
                      * Akan muncul jika catatan bersifat publik atau sudah
                      dibagikan
                    </i>
                    <br />
                    <i>
                      ** merupakan catatan sendiri atau anda merupakan user yang
                      mempunyai akses{" "}
                      {`(level lebih tinggi atau sebagai verifikator)`}
                    </i>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </CustomCard>
        </Box>
      </Container>
    </>
  );
}

export default Help;
