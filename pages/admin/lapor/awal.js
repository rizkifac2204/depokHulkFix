import { useState } from "react";
import Head from "next/head";
// library
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { darken, lighten } from "@mui/material/styles";
// ICON
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
// components
import { CustomToolbar } from "components/GlobalComponents/TableComponents";
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import LaporAwalDetail from "components/Lapor/Awal/LaporAwalDetail";

const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

async function deleteData(id) {
  if (id) {
    try {
      const res = await axios.delete(`/api/lapor/awal/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

function LaporAwal() {
  const queryClient = useQueryClient();
  const [pageSize, setPageSize] = useState(10);
  const [detail, setDetail] = useState({
    open: false,
    data: {},
  });

  const {
    data: awals,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["awals"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/lapor/awal`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: deleteData,
    onSuccess: (data, variable, context) => {
      toast.success(data.message || "Sukses");
      queryClient.invalidateQueries(["awals"]);
    },
    onError: (err, variables) => {
      toast.error(err.message);
    },
  });

  const handleDeleteClick = (id) => {
    const ask = confirm("Yakin Hapus Data?");
    if (ask) {
      mutateDelete(id);
    }
  };

  if (isError)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`An error has occurred: ${error.message}`}</Alert>
    );

  const columns = [
    {
      field: "nama",
      headerName: "Pelapor",
      minWidth: 200,
    },
    {
      field: "tanggal_lapor",
      headerName: "Tanggal Laporan",
      minWidth: 200,
    },
    {
      field: "telp",
      headerName: "Telp/HP",
      minWidth: 180,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 180,
    },
    {
      field: "uraian",
      headerName: "Uraian",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: (values) => {
        return [
          <GridActionsCellItem
            key={0}
            icon={<VisibilityIcon />}
            label="Detail"
            onClick={() => {
              setDetail({
                open: true,
                data: values.row,
              });
            }}
          />,
          <GridActionsCellItem
            key={1}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(values.id)}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Head>
        <title>{`Laporan Awal - Bawaslu Depok  Apps`}</title>
      </Head>
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <CustomCard>
                <Box
                  sx={{
                    height: 400,
                    width: "100%",
                    "& .super-app-theme--0": {
                      bgcolor: (theme) =>
                        getBackgroundColor(
                          theme.palette.info.main,
                          theme.palette.mode
                        ),
                      "&:hover": {
                        bgcolor: (theme) =>
                          getHoverBackgroundColor(
                            theme.palette.info.main,
                            theme.palette.mode
                          ),
                      },
                    },
                  }}
                >
                  <DataGrid
                    autoHeight
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[1, 2, 5, 10]}
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                    componentsProps={{
                      toolbar: {
                        multiSearch: true,
                      },
                    }}
                    loading={isLoading}
                    rows={awals ? awals : []}
                    columns={columns}
                    getRowClassName={(params) =>
                      `super-app-theme--${params.row.dibaca}`
                    }
                    disableRowSelectionOnClick
                  />
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <LaporAwalDetail
        open={detail.open}
        detail={detail.data}
        onClose={() =>
          setDetail({
            open: false,
            data: {},
          })
        }
        invalidateQueries={() => queryClient.invalidateQueries(["awals"])}
      />
    </>
  );
}

export default LaporAwal;
