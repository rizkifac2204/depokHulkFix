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
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EditIcon from "@mui/icons-material/Edit";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import BuildIcon from "@mui/icons-material/Build";

// components
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import Wait from "components/GlobalComponents/Wait";

import LaporanDetailSection from "components/Pelanggaran/Laporan/LaporanDetailSection";
import LaporanPrintPenyampaian from "components/Pelanggaran/Laporan/Print/LaporanPrintPenyampaian";
import LaporanPrintPerbaikan from "components/Pelanggaran/Laporan/Print/LaporanPrintPerbaikan";
import LaporanPrintData from "components/Pelanggaran/Laporan/Print/LaporanPrintData";

function LaporDetail() {
  const router = useRouter();
  const { laporan_id } = router.query;
  const queryClient = useQueryClient();
  const printRef = useRef();
  const printPenyampaianRef = useRef();
  const printPerbaikanRef = useRef();

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

  // ACTION NORMAL
  function handleDelete() {
    const ask = confirm("Yakin Hapus Data?");
    if (ask) {
      const toastProses = toast.loading("Tunggu Sebentar...", {
        autoClose: false,
      });
      axios
        .delete(`/api/pelanggaran/laporan/` + laporan_id)
        .then((res) => {
          toast.update(toastProses, {
            render: res.data.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          queryClient.invalidateQueries(["laporans"]);
          router.push("/admin/pelanggaran/laporan");
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
  const processPrintBuktiPenyampaian = useReactToPrint({
    content: () => printPenyampaianRef.current,
  });
  const processPrintBuktiPerbaikan = useReactToPrint({
    content: () => printPerbaikanRef.current,
  });
  const handlePrint = (param) => {
    if (param === "data") return processPrint();
    if (param === "penyampaian") return processPrintBuktiPenyampaian();
    if (param === "perbaikan") return processPrintBuktiPerbaikan();
    return;
  };

  const actions = [
    { icon: <DeleteIcon />, name: "Hapus", action: handleDelete },
    {
      icon: <EditIcon />,
      name: "Edit",
      action: () =>
        router.push(`/admin/pelanggaran/laporan/${laporan_id}/edit`),
    },
    {
      icon: <PrintIcon />,
      name: "Print Laporan",
      action: () => handlePrint("data"),
    },
    {
      icon: <FingerprintIcon />,
      name: "Print Tanda Bukti Penyampian",
      action: () => handlePrint("penyampaian"),
    },
    {
      icon: <BuildIcon />,
      name: "Print Tanda Bukti Perbaikan",
      action: () => handlePrint("perbaikan"),
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
        <title>{`Detail Laporan - Bawaslu Depok Apps`}</title>
      </Head>
      <SmallTitleBar title={`Laporan Nomor ${detail.nomor}`} />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <CustomCard>
            <LaporanDetailSection detail={detail} />
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

      <LaporanPrintPenyampaian detail={detail} ref={printPenyampaianRef} />
      <LaporanPrintPerbaikan detail={detail} ref={printPerbaikanRef} />
      <LaporanPrintData detail={detail} ref={printRef} />
    </div>
  );
}

export default LaporDetail;
