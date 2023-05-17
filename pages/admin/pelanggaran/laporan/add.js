import React from "react";
import Head from "next/head";

// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// components
import LaporanFormAdd from "components/Pelanggaran/Laporan/LaporanFormAdd";
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import CustomCard from "components/GlobalComponents/Card/CustomCard";

function LaporanAdd() {
  return (
    <div>
      <Head>
        <title>{`Tambah Laporan - Bawaslu Depok Apps`}</title>
      </Head>
      <SmallTitleBar title="Formulir Model B.1" />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <CustomCard>
            <LaporanFormAdd />
          </CustomCard>
        </Box>
      </Container>
    </div>
  );
}

export default LaporanAdd;
