import { useRef } from "react";
import Head from "next/head";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
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
import PrintIcon from "@mui/icons-material/Print";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EditIcon from "@mui/icons-material/Edit";
import AttachFileIcon from "@mui/icons-material/AttachFile";

// components
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import Wait from "components/GlobalComponents/Wait";

import PelanggaranBerkas from "components/Pelanggaran/Components/PelanggaranBerkas";
import TemuanDetailSection from "components/Pelanggaran/Temuan/TemuanDetailSection";
import TemuanPrintData from "components/Pelanggaran/Temuan/Print/TemuanPrintData";

function TemuanDetail() {
  const router = useRouter();
  const { temuan_id } = router.query;
  const queryClient = useQueryClient();
  const printRef = useRef();

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

  const {
    data: berkas,
    isError: isErrorBerkas,
    isLoading: isLoadingBerkas,
    error: errorBerkas,
  } = useQuery({
    enabled: !!detail?.id,
    queryKey: ["temuan", temuan_id, "berkas"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/pelanggaran/temuan/${temuan_id}/berkas`, { signal })
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
        .delete(`/api/pelanggaran/temuan/` + temuan_id)
        .then((res) => {
          toast.update(toastProses, {
            render: res.data.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          router.push("/admin/pelanggaran/temuan");
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

  // PRINT
  const processPrint = useReactToPrint({
    content: () => printRef.current,
  });
  const handlePrint = (param) => {
    processPrint();
  };

  const actions = [
    { icon: <DeleteIcon />, name: "Hapus Temuan", action: handleDelete },
    {
      icon: <EditIcon />,
      name: "Edit Temuan",
      action: () => router.push(`/admin/pelanggaran/temuan/${temuan_id}/edit`),
    },
    {
      icon: <PrintIcon />,
      name: "Print Temuan",
      action: () => handlePrint("data"),
    },
    {
      icon: <FileCopyIcon />,
      name: "Surat Panggilan",
      action: () => console.log("Surat Panggilan"),
    },
    {
      icon: <LocalLibraryIcon />,
      name: "Surat Undangan Klarifikasi",
      action: () => console.log("Surat Undangan Klarifikasi"),
    },
    {
      icon: <AttachFileIcon />,
      name: "BA Klarifikasi",
      action: () => console.log("BA KALRIFIKASI"),
    },
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
        <title>{`Detail Temuan - Bawaslu Depok Apps`}</title>
      </Head>
      <SmallTitleBar title={`Temuan Nomor ${detail.nomor}`} />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <TemuanDetailSection
            detail={detail}
            invalidateQueries={() =>
              queryClient.invalidateQueries(["temuan", temuan_id])
            }
          />
        </Box>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <PelanggaranBerkas
            data={berkas}
            detail={detail}
            invalidateQueries={() =>
              queryClient.invalidateQueries(["temuan", temuan_id, "berkas"])
            }
            param="temuan"
          />
        </Box>
      </Container>

      <SpeedDial
        ariaLabel="SpeedDial"
        icon={<SpeedDialIcon />}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
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

      <TemuanPrintData detail={detail} ref={printRef} />
    </div>
  );
}

export default TemuanDetail;
