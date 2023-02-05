import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
// library
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
// MUI
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
// ICON
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// components
import { CustomToolbar } from "components/GlobalComponents/TableComponents";
import ProfileDetail from "components/Profile/ProfileDetail";
import CustomCard from "components/GlobalComponents/Card/CustomCard";

async function deleteData(id) {
  if (id) {
    try {
      const res = await axios.delete(`/api/simpeg/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

function Simpeg() {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const hideOnLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [pageSize, setPageSize] = useState(10);

  const {
    data: users,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/simpeg`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const [detail, setDetail] = useState({});
  useEffect(() => {
    if (!users || users.length === 0) return;
    setDetail(users[0]);
  }, [users]);

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: deleteData,
    onSuccess: (data, variable, context) => {
      toast.success(data.message || "Sukses");
      queryClient.invalidateQueries(["users"]);
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
      field: "nama_admin",
      headerName: "Nama",
      minWidth: 180,
    },
    {
      field: "nama_bawaslu",
      headerName: "Unit",
      minWidth: 180,
    },
    {
      field: "telp_admin",
      headerName: "Telp/HP",
      width: 180,
    },
    {
      field: "email_admin",
      headerName: "Email",
      width: 180,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      hide: hideOnLg,
      getActions: (values) => {
        if (values.row.myself) {
          return [
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Profile"
              components={Link}
              href={`/admin/profile`}
            />,
          ];
        }
        if (values.row.editable) {
          return [
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Detail"
              components={Link}
              href={`/admin/simpeg/${values.id}`}
            />,
            <GridActionsCellItem
              icon={<EditOutlinedIcon />}
              label="Edit"
              components={Link}
              href={`/admin/simpeg/${values.id}/edit`}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick(values.id)}
            />,
          ];
        } else {
          return [
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Detail"
              components={Link}
              href={`/admin/simpeg/${values.id}`}
            />,
          ];
        }
      },
    },
  ];

  return (
    <>
      <Head>
        <title>{`Simpeg - Bawaslu Depok  Apps`}</title>
      </Head>
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
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
                      rows={users ? users : []}
                      columns={columns}
                      onRowClick={({ row }) => setDetail(row)}
                    />
                  </div>
                </div>
              </CustomCard>
            </Grid>
            <Grid item lg={3}>
              {Object.keys(detail).length !== 0 ? (
                <Box pt={3} sx={{ display: { xs: "none", lg: "block" } }}>
                  <ProfileDetail
                    profile={detail}
                    isUser={true}
                    handleDeleteClick={() => handleDeleteClick(detail.id)}
                  />
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Simpeg;
