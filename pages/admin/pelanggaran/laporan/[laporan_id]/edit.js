import React from "react";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";

// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

// components
import LaporanFormEdit from "components/Pelanggaran/Laporan/LaporanFormEdit";
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import Wait from "components/GlobalComponents/Wait";

function LaporEdit() {
  const router = useRouter();
  const { laporan_id } = router.query;

  const {
    data: detail,
    isError,
    isLoading,
    error,
  } = useQuery({
    enabled: !!laporan_id,
    queryKey: ["laporan", laporan_id],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/pelanggaran/laporan/${laporan_id}`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  if (isLoading) return <Wait loading={true} />;
  if (isError)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`An error has occurred: ${error.message}`}</Alert>
    );

  return (
    <div>
      <Head>
        <title>{`Edit Laporan - Bawaslu Depok Apps`}</title>
      </Head>
      <SmallTitleBar
        title="Formulir Edit Laporan Model B.1"
        center={false}
        buttonLink={`/admin/pelanggaran/laporan/${detail.id}`}
        buttonText={`Detail`}
      />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <CustomCard>
            <LaporanFormEdit detail={detail} />
          </CustomCard>
        </Box>
      </Container>
    </div>
  );
}

export default LaporEdit;
