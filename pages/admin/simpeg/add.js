import React from "react";
import Head from "next/head";

// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// components
import FormSimpegAdd from "components/Simpeg/Form/FormSimpegAdd";
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import CustomCard from "components/GlobalComponents/Card/CustomCard";

function TambahUser() {
  return (
    <div>
      <Head>
        <title>{`Tambah Pegawai - Bawaslu Depok  Apps`}</title>
      </Head>
      <SmallTitleBar title="Tambah Data Pegawai" />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <CustomCard>
            <FormSimpegAdd />
          </CustomCard>
        </Box>
      </Container>
    </div>
  );
}

export default TambahUser;
