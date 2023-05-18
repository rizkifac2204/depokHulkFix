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
import TemuanFormEdit from "components/Pelanggaran/Temuan/TemuanFormEdit";
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import Wait from "components/GlobalComponents/Wait";

function TemuanEdit() {
  const router = useRouter();
  const { temuan_id } = router.query;

  const {
    data: detail,
    isError,
    isLoading,
    error,
  } = useQuery({
    enabled: !!temuan_id,
    queryKey: ["temuan", temuan_id],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/pelanggaran/temuan/${temuan_id}`, { signal })
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
        <title>{`Edit Temuan - Bawaslu Depok Apps`}</title>
      </Head>
      <SmallTitleBar
        title="Formulir Edit Temuan Model B.2"
        center={false}
        buttonLink={`/admin/pelanggaran/temuan/${detail.id}`}
        buttonText={`Detail`}
      />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <CustomCard>
            <TemuanFormEdit detail={detail} />
          </CustomCard>
        </Box>
      </Container>
    </div>
  );
}

export default TemuanEdit;
