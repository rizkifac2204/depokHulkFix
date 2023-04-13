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
  golongan: "",
  jabatan: "",
  tahun_mulai: "",
  gaji_jabatan: "",
  sk_jabatan: "",
  no_sk_jabatan: "",
  tgl_sk_jabatan: "",
  validasi: 0,
  isNew: true,
};

async function postData(values) {
  const { isNew, id } = values;
  if (!isNew) {
    try {
      const res = await axios.put(`/api/profile/riwayat/jabatan/${id}`, values);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  } else {
    try {
      const res = await axios.post(`/api/profile/riwayat/jabatan`, values);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

async function deleteData(id) {
  if (id) {
    try {
      const res = await axios.delete(`/api/profile/riwayat/jabatan/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

function ProfileJabatan() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile", "riwayat", "jabatan"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/profile/riwayat/jabatan`, { signal })
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
      queryClient.invalidateQueries(["profile", "riwayat", "jabatan"]);
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
      queryClient.invalidateQueries(["profile", "riwayat", "jabatan"]);
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

  // UTILS JABATAN
  const {
    data: jabatan,
    isError: isErrorJabatan,
    isLoading: isLoadingJabatan,
  } = useQuery({
    initialData: [],
    queryKey: ["utils", "jabatan"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/utils/jabatan`, { signal })
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
      field: "golongan",
      headerName: "Golongan",
      editable: true,
      flex: 1,
      minWidth: 150,
      type: "singleSelect",
      valueOptions: golongan.map((item) => item.golongan),
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
          {params.row.golongan}
        </>
      ),
    },
    {
      field: "jabatan",
      headerName: "Jabatan",
      editable: true,
      minWidth: 150,
      type: "singleSelect",
      valueOptions: jabatan.map((item) => item.jabatan),
    },
    {
      field: "tahun_mulai",
      headerName: "Tahun Mulai",
      type: "number",
      editable: true,
      width: 90,
      valueFormatter: (params) => {
        if (!Boolean(params.value)) return "";
        const valueFormatted = params.value.toString();
        return `${valueFormatted}`;
      },
    },
    {
      field: "gaji_jabatan",
      headerName: "Gaji Jabatan",
      editable: true,
      minWidth: 150,
    },
    {
      field: "sk_jabatan",
      headerName: "SK Jabatan",
      editable: true,
      minWidth: 150,
    },
    {
      field: "no_sk_jabatan",
      headerName: "Nomor SK Jabatan",
      editable: true,
      minWidth: 150,
    },
    {
      field: "tgl_sk_jabatan",
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
              key={0}
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={1}
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
            key={2}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={3}
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
        <title>{`Profile Riwayat Jabatan - Bawaslu Depok  Apps`}</title>
      </Head>
      <LayoutRiwayatDanKeluarga>
        <SmallTitleBar title="Data Riwayat Jabatan" />
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
          <DataGrid
            loading={isLoading || isLoadingMutate || isLoadingDelete}
            rows={rows || []}
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

export default ProfileJabatan;
