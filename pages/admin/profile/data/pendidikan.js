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

const initialStructure = {
  pendidikan: "",
  nama: "",
  jurusan: "",
  tahun_ijazah: "",
  tempat: "",
  pimpinan: "",
  validasi: 0,
  isNew: true,
};

async function postData(values) {
  const { isNew, id } = values;
  if (!isNew) {
    try {
      const res = await axios.put(
        `/api/profile/riwayat/pendidikan/${id}`,
        values
      );
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  } else {
    try {
      const res = await axios.post(`/api/profile/riwayat/pendidikan`, values);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

async function deleteData(id) {
  if (id) {
    try {
      const res = await axios.delete(`/api/profile/riwayat/pendidikan/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

function ProfilePendidikan() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile", "riwayat", "pendidikan"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/profile/riwayat/pendidikan`, { signal })
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
      queryClient.invalidateQueries(["profile", "riwayat", "pendidikan"]);
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
      queryClient.invalidateQueries(["profile", "riwayat", "pendidikan"]);
    },
    onError: (err, variables) => {
      toast.error(err.message);
    },
  });

  // UTILS PENDIDIKAN
  const { data: pendidikan } = useQuery({
    initialData: [],
    queryKey: ["utils", "pendidikan"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/utils/pendidikan`, { signal })
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
      field: "pendidikan",
      headerName: "Pendidikan",
      editable: true,
      flex: 1,
      minWidth: 150,
      type: "singleSelect",
      valueOptions: pendidikan.map((item) => item.pendidikan),
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
          {params.row.pendidikan}
        </>
      ),
    },
    {
      field: "nama",
      headerName: "Nama Pendidikan",
      editable: true,
      minWidth: 150,
    },
    {
      field: "jurusan",
      headerName: "Jurusan",
      editable: true,
      minWidth: 150,
    },
    {
      field: "tahun_ijazah",
      headerName: "Tahun Ijazah",
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
      field: "tempat",
      headerName: "Tempat",
      editable: true,
      minWidth: 150,
    },
    {
      field: "pimpinan",
      headerName: "Nama Pimpinan",
      editable: true,
      minWidth: 150,
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
        <title>{`Profile Riwayat Pendidikan - Bawaslu Depok Apps`}</title>
      </Head>
      <LayoutRiwayatDanKeluarga>
        <SmallTitleBar title="Data Riwayat Pendidikan" />
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

export default ProfilePendidikan;
