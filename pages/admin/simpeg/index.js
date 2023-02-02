import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// library
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// MUI
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
// ICON
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
// components
import { CustomToolbar } from "components/GlobalComponents/TableComponents";
import ProfileDetail from "components/Profile/ProfileDetail";
import CustomCard from "components/GlobalComponents/Card/CustomCard";

function Simpeg() {
  const router = useRouter();
  const theme = useTheme();
  const hideOnLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [pageSize, setPageSize] = useState(10);

  const {
    data: users,
    isError,
    isLoading,
    error,
  } = useQuery({
    initialData: [],
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
    if (users.length === 0) return;
    setDetail(users[0]);
  }, [users]);

  const handleDeleteClick = (id) => {
    console.log(id);
  };

  if (isLoading) return <LinearProgress sx={{ height: "4px" }} />;
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
      flex: 1,
      minWidth: 250,
    },
    {
      field: "nama_bawaslu",
      headerName: "Unit",
      width: 180,
    },
    {
      field: "telp_admin",
      headerName: "Telp/HP",
      width: 180,
    },
    {
      field: "email_admin",
      headerName: "Email",
      width: 250,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      hide: hideOnLg,
      getActions: (values) => {
        return [
          <GridActionsCellItem
            key="0"
            icon={<VisibilityIcon />}
            label="Detail"
            onClick={() => router.push("/admin/simpeg/" + values.id)}
          />,
          <GridActionsCellItem
            key="4"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(values.id)}
            showInMenu
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Head>
        <title>{`Simpeg - BWS Depok Apps`}</title>
      </Head>
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
              <CustomCard minHeight={600}>
                <DataGrid
                  experimentalFeatures={{ newEditingApi: true }}
                  autoHeight
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[1, 2, 5, 10]}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  componentsProps={{
                    toolbar: {
                      // selectedItem: [],
                      // handleDeleteSelected: () => {},
                      multiSearch: true,
                    },
                  }}
                  loading={isLoading}
                  rows={users}
                  columns={columns}
                  onRowClick={({ row }) => setDetail(row)}
                />
              </CustomCard>
            </Grid>
            <Grid item lg={3}>
              {Object.keys(detail).length !== 0 ? (
                <Box pt={3} sx={{ display: { xs: "none", lg: "block" } }}>
                  <ProfileDetail profile={detail} isUser={true} />
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
