import React from "react";
import Head from "next/head";

// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// components
import TemuanFormAdd from "components/Pelanggaran/Temuan/TemuanFormAdd";
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import CustomCard from "components/GlobalComponents/Card/CustomCard";

function TemuanAdd() {
  return (
    <div>
      <Head>
        <title>{`Tambah Temuan - Bawaslu Depok Apps`}</title>
      </Head>
      <SmallTitleBar title="Formulir Model B.2" />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <CustomCard>
            <TemuanFormAdd />
          </CustomCard>
        </Box>
      </Container>
    </div>
  );
}

export default TemuanAdd;
