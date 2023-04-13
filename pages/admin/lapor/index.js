import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
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
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
// ICON
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// components
import { CustomToolbar } from "components/GlobalComponents/TableComponents";
import CustomCard from "components/GlobalComponents/Card/CustomCard";

async function deleteData(id) {
  if (id) {
    try {
      const res = await axios.delete(`/api/lapor/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

function Lapor() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pageSize, setPageSize] = useState(10);

  const {
    data: lapors,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lapors"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/lapor`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: deleteData,
    onSuccess: (data, variable, context) => {
      toast.success(data.message || "Sukses");
      queryClient.invalidateQueries(["lapors"]);
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
      field: "nomor",
      headerName: "Nomor",
      minWidth: 180,
    },
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
      field: "peristiwa",
      headerName: "Peristiwa",
      minWidth: 180,
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
            onClick={() => router.push("/admin/lapor/" + values.id)}
          />,
          <GridActionsCellItem
            key={1}
            icon={<EditOutlinedIcon />}
            label="Edit"
            onClick={() => router.push(`/admin/lapor/${values.id}/edit`)}
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
        <title>{`Lapor - Bawaslu Depok  Apps`}</title>
      </Head>
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <CustomCard minHeight={600}>
                <div style={{ display: "flex", height: "100%" }}>
                  <div style={{ flexGrow: 1 }}>
                    <DataGrid
                      experimentalFeatures={{ newEditingApi: true }}
                      autoHeight
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
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
                      rows={lapors ? lapors : []}
                      columns={columns}
                    />
                  </div>
                </div>
              </CustomCard>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Lapor;
