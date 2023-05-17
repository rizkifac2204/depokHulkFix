import Head from "next/head";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// ICONS
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";

// components
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import Wait from "components/GlobalComponents/Wait";
import PelaporDetailSection from "components/Pelanggaran/Pelapor/PelaporDetailSection";

function PelaporDetail() {
  const router = useRouter();
  const { pelapor_id } = router.query;
  const queryClient = useQueryClient();

  const {
    data: pelapor,
    isError,
    isLoading,
    error,
  } = useQuery({
    enabled: !!pelapor_id,
    queryKey: ["pelapor", pelapor_id],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/pelanggaran/laporan/pelapor/${pelapor_id}`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  // ACTION NORMAL
  function handleDelete() {
    const ask = confirm("Yakin Hapus Data?");
    if (ask) {
      const toastProses = toast.loading("Tunggu Sebentar...", {
        autoClose: false,
      });
      axios
        .delete(`/api/pelanggaran/laporan/pelapor/` + pelapor_id)
        .then((res) => {
          toast.update(toastProses, {
            render: res.data.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          queryClient.invalidateQueries(["pelapors"]);
          router.push("/admin/pelanggaran/laporan/pelapor");
        })
        .catch((err) => {
          toast.update(toastProses, {
            render: err.response.data.message,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        });
    }
  }

  const actions = [
    {
      icon: <EditIcon />,
      name: "Edit",
      action: () =>
        router.push(`/admin/pelanggaran/laporan/pelapor/${pelapor_id}/edit`),
    },
    { icon: <DeleteIcon />, name: "Hapus", action: handleDelete },
  ];

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
        <title>{`Detail Pelapor - Bawaslu Depok Apps`}</title>
      </Head>
      <SmallTitleBar title={`Detail Data Pelapor - ${pelapor.nama}`} />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <CustomCard>
            <PelaporDetailSection detail={pelapor} />
            <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial"
                sx={{ position: "absolute", bottom: 0, right: 0 }}
                icon={<SpeedDialIcon />}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.action}
                  />
                ))}
              </SpeedDial>
            </Box>
          </CustomCard>
        </Box>
      </Container>
    </div>
  );
}

export default PelaporDetail;
