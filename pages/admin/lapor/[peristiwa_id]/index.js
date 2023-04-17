import { useState, useRef } from "react";
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

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LinearProgress from "@mui/material/LinearProgress";
// ICONS
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import PrintIcon from "@mui/icons-material/Print";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EditIcon from "@mui/icons-material/Edit";

// components
import LaporDetailSection from "components/Lapor/LaporDetail";
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import Wait from "components/GlobalComponents/Wait";

function LaporDetail() {
  const router = useRouter();
  const { peristiwa_id } = router.query;

  const queryClient = useQueryClient();
  const [openResponse, setOpenResponse] = useState(false);
  const [profileBawaslu, setProfileBawaslu] = useState({});

  const printRef = useRef();
  const printBuktiRef = useRef();

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

  // ACTION NORMAL
  function handleDelete() {
    const ask = confirm("Yakin Hapus Data?");
    if (ask) {
      const toastProses = toast.loading("Tunggu Sebentar...", {
        autoClose: false,
      });
      axios
        .delete(`/api/lapor/` + peristiwa_id)
        .then((res) => {
          toast.update(toastProses, {
            render: res.data.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          queryClient.invalidateQueries(["lapors"]);
          router.push("/admin/lapor");
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
  function fetchProfileBawaslu(callback) {
    const toastProses = toast.loading("Menyiapkan Format...");
    axios
      .get(`/api/lapor/profileBawaslu?id=` + 0)
      .then((res) => {
        setProfileBawaslu(res.data);
        toast.dismiss(toastProses);
        callback();
      })
      .catch((err) => {
        console.log(err);
        toast.update(toastProses, {
          render: "Terjadi Kesalahan",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  }
  // PRINT
  const handlePrint = (param) => {
    const isNotReady = Object.keys(profileBawaslu).length === 0;
    if (isNotReady)
      return fetchProfileBawaslu(() => {
        param === "bukti" ? processPrintBukti() : processPrint();
      });
    param === "bukti" ? processPrintBukti() : processPrint();
  };
  const processPrint = useReactToPrint({
    content: () => printRef.current,
  });
  const processPrintBukti = useReactToPrint({
    content: () => printBuktiRef.current,
  });
  // RESPONSE
  function handleResponse() {
    setOpenResponse(true);
  }
  function handleCloseResponse() {
    setOpenResponse(false);
  }
  const actions = [
    { icon: <LocalLibraryIcon />, name: "Tanggapi", action: handleResponse },
    {
      icon: <FileCopyIcon />,
      name: "Print Bukti Permohonan",
      action: () => handlePrint("bukti"),
    },
    {
      icon: <PrintIcon />,
      name: "Print Data Permohonan",
      action: () => handlePrint("data"),
    },
    {
      icon: <EditIcon />,
      name: "Edit",
      action: () => router.push(`/admin/lapor/${peristiwa_id}/edit`),
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
        <title>{`Detail Laporan - Bawaslu Depok  Apps`}</title>
      </Head>
      <SmallTitleBar title={`Nomor ${detail.nomor}`} />
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <CustomCard>
            <LaporDetailSection detail={detail} />
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

export default LaporDetail;
