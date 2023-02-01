// lybrary
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// MUI
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

//  Components
import Head from "next/head";
import LayoutRiwayatDanKeluarga from "components/Profile/Components/LayoutRiwayatDanKeluarga";
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import EditToolbar from "components/Profile/Components/EditToolbar";
import { formatedDate } from "utils/formatDate";

const initialStructure = {
  pangkat: "",
  jenis: "",
  golongan: "",
  terhitung_mulai: "",
  gaji_pokok: "",
  sk_pejabat: "",
  no_sk: "",
  tanggal_sk: "",
  dasar_peraturan: "",
  validasi: 0,
  isNew: true,
};

async function postData(values) {
  const { isNew, id } = values;
  if (!isNew) {
    try {
      const res = await axios.put(
        `/api/profile/riwayat/kepangkatan/${id}`,
        values
      );
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  } else {
    try {
      const res = await axios.post(`/api/profile/riwayat/kepangkatan`, values);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

async function deleteData(id) {
  if (id) {
    try {
      const res = await axios.delete(`/api/profile/riwayat/kepangkatan/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

function ProfileKepangkatan() {
  const { data, isLoading } = useQuery({
    initialData: [],
    queryKey: ["profile", "riwayat", "kepangkatan"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/profile/riwayat/kepangkatan`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });
  const queryClient = useQueryClient();
  const [rowModesModel, setRowModesModel] = useState({});
  const [rows, setRows] = useState(data);
  useEffect(() => setRows((prev) => data), [data]);

  const { mutate, isLoading: isLoadingMutate } = useMutation({
    mutationFn: postData,
    onSuccess: (data, variable, context) => {
      toast.success(data.message || "Sukses");
      const { id } = variable;
      setRows(
        rows.map((row) => (row.id === id ? { ...row, isNew: false } : row))
      );
      queryClient.invalidateQueries(["profile", "riwayat", "kepangkatan"]);
    },
    onError: (err, variables) => {
      const { id } = variables;
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      toast.error(err.message);
    },
  });

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: deleteData,
    onSuccess: (data, variable, context) => {
      toast.success(data.message || "Sukses");
      setRows(rows.filter((row) => row.id !== variable));
      queryClient.invalidateQueries(["profile", "riwayat", "kepangkatan"]);
    },
    onError: (err, variables) => {
      toast.error(err.message);
    },
  });

  // UTILS GOLONGAN
  const {
    data: golongan,
    isError: isErrorGolongan,
    isLoading: isLoadingGolongan,
  } = useQuery({
    initialData: [],
    queryKey: ["utils", "golongan"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/utils/golongan`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  // UTILS PANGKAT
  const {
    data: pangkat,
    isError: isErrorPangkat,
    isLoading: isLoadingPangkat,
  } = useQuery({
    initialData: [],
    queryKey: ["utils", "pangkat"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/utils/pangkat`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    const ask = confirm("Yakin Hapus Data?");
    if (ask) {
      mutateDelete(id);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    mutate(newRow);
    return newRow;
  };

  const columns = [
    {
      field: "pangkat",
      headerName: "Pangkat",
      editable: true,
      flex: 1,
      minWidth: 150,
      type: "singleSelect",
      valueOptions: pangkat.map((item) => item.pangkat),
      renderCell: (params) => (
        <>
          {Boolean(params.row.validasi) ? (
            <Tooltip title="Sudah Verifikasi Admin">
              <CheckIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Menunggi Verifikasi Admin">
              <CloseIcon />
            </Tooltip>
          )}
          {params.row.pangkat}
        </>
      ),
    },
    {
      field: "jenis",
      headerName: "Jenis",
      editable: true,
      minWidth: 150,
    },
    {
      field: "golongan",
      headerName: "Golongan",
      editable: true,
      width: 150,
      type: "singleSelect",
      valueOptions: golongan.map((item) => item.golongan),
    },
    {
      field: "terhitung_mulai",
      headerName: "Terhitung Mulai",
      type: "date",
      editable: true,
      width: 150,
      valueFormatter: (params) => {
        if (!params.value) return "";
        return formatedDate(params.value);
      },
    },
    {
      field: "gaji_pokok",
      headerName: "Gaji Pokok",
      editable: true,
      minWidth: 150,
    },
    {
      field: "sk_pejabat",
      headerName: "SK Pejabat",
      editable: true,
      minWidth: 150,
    },
    {
      field: "no_sk",
      headerName: "Nomor SK",
      editable: true,
      minWidth: 150,
    },
    {
      field: "tanggal_sk",
      headerName: "Tanggal SK",
      type: "date",
      editable: true,
      width: 150,
      valueFormatter: (params) => {
        if (!params.value) return "";
        return formatedDate(params.value);
      },
    },
    {
      field: "dasar_peraturan",
      headerName: "Dasar Peraturan",
      editable: true,
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Aksi",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Head>
        <title>{`Profile Riwayat Kepangkatan - BWS Depok Apps`}</title>
      </Head>
      <LayoutRiwayatDanKeluarga>
        <SmallTitleBar title="Data Riwayat Kepangkatan" />
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          {isLoading && "LOADING"}
          <DataGrid
            loading={isLoading || isLoadingMutate || isLoadingDelete}
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            components={{
              Toolbar: EditToolbar,
            }}
            componentsProps={{
              toolbar: { setRows, setRowModesModel, initialStructure },
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </LayoutRiwayatDanKeluarga>
    </>
  );
}

export default ProfileKepangkatan;
