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
import FormLaporEdit from "components/Lapor/LaporEdit";
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import Wait from "components/GlobalComponents/Wait";

function LaporEdit() {
  const router = useRouter();
  const { peristiwa_id } = router.query;

  const {
    data: detail,
    isError,
    isLoading,
    error,
  } = useQuery({
    enabled: !!peristiwa_id,
    queryKey: ["lapor", peristiwa_id],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/lapor/${peristiwa_id}`, { signal })
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
        <title>{`Edit Laporan - Bawaslu Depok  Apps`}</title>
      </Head>
      <SmallTitleBar title="Formulir Model B.1" />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <CustomCard>
            <FormLaporEdit detail={detail} />
          </CustomCard>
        </Box>
      </Container>
    </div>
  );
}

export default LaporEdit;
