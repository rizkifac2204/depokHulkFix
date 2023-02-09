import * as React from "react";
import Head from "next/head";
import Container from "@mui/material/Container";

import CustomCard from "components/GlobalComponents/Card/CustomCard";

function Dashboard() {
  return (
    <div>
      <Head>
        <title>{`Dashboard - Bawaslu Depok  Apps`}</title>
      </Head>
      <br />
      <Container maxWidth={false}>
        <CustomCard>
          Halaman ini akan menampilkan :
          <ul>
            <li>jumlah Pegawai</li>
            <li>
              jumlah Data (misalkan : jumlah data cyber, form-a, notes, etc)
            </li>
            <li>Mungkin data ulang tahun</li>
          </ul>
          Tambahan untuk Untuk Admin :
          <ul>
            <li>Jumlah Data yang harus diverifikasi</li>
            <li>Etc...</li>
          </ul>
        </CustomCard>
      </Container>
    </div>
  );
}

export default Dashboard;
