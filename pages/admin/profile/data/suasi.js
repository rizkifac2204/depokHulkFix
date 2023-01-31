import LayoutRiwayatDanKeluarga from "components/Profile/Components/LayoutRiwayatDanKeluarga";
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const initialStructure = {
  id: null,
  nama: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  tanggal_nikah: "",
  pekerjaan: "",
  keterangan: "",
  validasi: 0,
  isNew: true,
};

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = makeid(5);
    setRows((oldRows) => [
      ...oldRows,
      {
        ...initialStructure,
        id: id,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "nama" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Tambah Data
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

async function postData(values) {
  const { isNew, id } = values;
  if (!isNew) {
    try {
      const res = await axios.put(`/api/profile/keluarga/suasi/${id}`, values);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  } else {
    try {
      const res = await axios.post(`/api/profile/keluarga/suasi`, values);
      return res.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

async function deleteData(id) {
  if (id) {
    try {
      const res = await axios.delete(`/api/profile/keluarga/suasi/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
}

function ProfileSuasi() {
  const { data, isLoading } = useQuery({
    initialData: [],
    queryKey: ["profile", "keluarga", "suasi"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/profile/keluarga/suasi`, { signal })
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
      queryClient.invalidateQueries(["profile", "keluarga", "suasi"]);
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
      queryClient.invalidateQueries(["profile", "keluarga", "suasi"]);
    },
    onError: (err, variables) => {
      toast.error(err.message);
    },
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
    { field: "validasi", headerName: "Verifikasi", editable: false },
    { field: "nama", headerName: "Nama", editable: true },
    {
      field: "tempat_lahir",
      headerName: "Tempat Lahir",
      editable: true,
    },
    {
      field: "tanggal_lahir",
      headerName: "Tanggal Lahir",
      type: "date",
      editable: true,
    },
    {
      field: "tanggal_nikah",
      headerName: "Tanggal Nikah",
      type: "date",
      editable: true,
    },
    {
      field: "pekerjaan",
      headerName: "Pekerjaan",
      editable: true,
    },
    {
      field: "keterangan",
      headerName: "Keterangan",
      editable: true,
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
    <LayoutRiwayatDanKeluarga>
      <SmallTitleBar title="Data Suami / Istri" />
      <Box
        sx={{
          px: 3,
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
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </LayoutRiwayatDanKeluarga>
  );
}

export default ProfileSuasi;
