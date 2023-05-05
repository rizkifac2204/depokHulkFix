import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// library
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
// ICON
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
// components
import { CustomToolbar } from "components/GlobalComponents/TableComponents";
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import LaporAwalDetail from "components/Lapor/Awal/LaporAwalDetail";

function getTTL(params) {
  return (
    <>
      <Typography>
        {params.row.tempat_lahir}
        <br />
        <Typography variant="caption" color="primary">
          {params.row.tanggal_lahir}
        </Typography>
      </Typography>
    </>
  );
}

async function deleteData(id) {
  if (id) {
    try {
      const res = await axios.delete(`/api/lapor/pelapor/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

function Pelapor() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pageSize, setPageSize] = useState(10);
  const [detail, setDetail] = useState({
    open: false,
    data: {},
  });

  const {
    data: pelapors,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pelapors"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/lapor/pelapor`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: deleteData,
    onSuccess: (data, variable, context) => {
      toast.success(data.message || "Sukses");
      queryClient.invalidateQueries(["pelapors"]);
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
      headerName: "Nama",
      minWidth: 200,
    },
    {
      field: "Lahir",
      headerName: "TTL",
      renderCell: getTTL,
      minWidth: 130,
    },
    {
      field: "jenis_kelamin",
      headerName: "Gender",
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
      field: "pekerjaan",
      headerName: "Pekerjaan",
      minWidth: 180,
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
            onClick={() => router.push(`/admin/lapor/pelapor/${values.id}`)}
          />,
          <GridActionsCellItem
            key={1}
            icon={<EditIcon />}
            label="Edit"
            onClick={() =>
              router.push(`/admin/lapor/pelapor/${values.id}/edit`)
            }
          />,
          <GridActionsCellItem
            key={2}
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
                  rows={pelapors ? pelapors : []}
                  columns={columns}
                  getRowClassName={(params) =>
                    `super-app-theme--${params.row.dibaca}`
                  }
                  disableRowSelectionOnClick
                />
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
        invalidateQueries={() => queryClient.invalidateQueries(["pelapors"])}
      />
    </>
  );
}

export default Pelapor;
