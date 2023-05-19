import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// MUI
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// icons
import UploadIcon from "@mui/icons-material/Upload";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// component
import CustomCard from "components/GlobalComponents/Card/CustomCard";

const models = [
  "FORMULIR MODEL B.1",
  "FORMULIR MODEL B.2",
  "FORMULIR MODEL B.3",
  "FORMULIR MODEL B.3.1",
  "FORMULIR MODEL B.4",
  "FORMULIR MODEL B.5",
  "FORMULIR MODEL B.6",
  "FORMULIR MODEL B.7",
  "FORMULIR MODEL B.8",
  "FORMULIR MODEL B.9",
  "FORMULIR MODEL B.10",
  "FORMULIR MODEL B.11",
  "FORMULIR MODEL B.12",
  "FORMULIR MODEL B.13",
  "FORMULIR MODEL B.14",
  "FORMULIR MODEL B.15",
  "FORMULIR MODEL B.16",
  "FORMULIR MODEL B.17",
  "FORMULIR MODEL B.18",
  "FORMULIR MODEL B.19",
  "FORMULIR MODEL B.20",
  "FORMULIR MODEL B.21",
  "LAINNYA",
];

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function PelanggaranBerkas({ data, detail, invalidateQueries, param }) {
  const [berkas, setBerkas] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e, isFile) => {
    if (!berkas) return;
    const file = isFile ? e.target.files[0] : null;
    if (!file) return;
    const filename = `${detail.id}_${file?.name || "nofile"}`;
    const formData = new FormData();
    formData.append("file", file, filename);
    formData.append("berkas", berkas);
    formData.append("keterangan", keterangan);
    setIsUploading(true);
    axios
      .post(`/api/pelanggaran/${param}/${detail.id}/berkas`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          destinationfile: "berkas-pelanggaran",
        },
        onUploadProgress: (event) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      })
      .then((res) => {
        setBerkas("");
        setKeterangan("");
        toast.success(res.data.message);
        invalidateQueries();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .then(() => {
        setIsUploading(false);
        setProgress(0);
      });
  };
  const deleteFile = (item) => {
    const ask = confirm("Yakin Hapus File Data?");
    if (ask) {
      const toastProses = toast.loading("Tunggu Sebentar...", {
        autoClose: false,
      });
      axios
        .delete(`/api/pelanggaran/${param}/${detail.id}/berkas`, {
          params: {
            id: item.id,
            file: item.file,
            path: "berkas-pelanggaran",
          },
        })
        .then((res) => {
          toast.update(toastProses, {
            render: res.data.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.update(toastProses, {
            render: err.response.data.message,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        })
        .then(() => invalidateQueries());
    }
  };

  if (!data) return <></>;
  return (
    <CustomCard
      title={`Berkas Pelanggaran`}
      caption={`Data Berkas/Dokumen Pelanggaran`}
      showDivider={true}
    >
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Berkas</b>
              </TableCell>
              <TableCell align="right">
                <b>Keterangan</b>
              </TableCell>
              <TableCell align="right">
                <b>File</b>
              </TableCell>
              <TableCell align="right">
                <b>Aksi</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell scope="row" colSpan={4}>
                  <Alert severity="info">Belum Ada Berkas</Alert>
                </TableCell>
              </TableRow>
            )}

            {data.length !== 0 &&
              data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.berkas}
                  </TableCell>
                  <TableCell align="right">{item.keterangan || "-"}</TableCell>
                  <TableCell align="right">
                    <a
                      href={
                        "/api/services/file/public/berkas-pelanggaran/" +
                        item.file
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.file}
                    </a>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      title="Delete File"
                      onClick={() => deleteFile(item)}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          mt: 3,
          mr: 8,
          mb: 8,
          display: "flex",
          alignItems: "center",
          minWidth: 300,
          maxWidth: 600,
        }}
      >
        <FormControl sx={{ width: 300 }} variant="standard" placeholder="Model">
          <Select
            displayEmpty
            name="berkas"
            value={berkas}
            onChange={(e) => setBerkas(e.target.value)}
            label="Formulir Model"
          >
            <MenuItem disabled value="">
              <em> Pilih Formulir Model</em>
            </MenuItem>

            {models.map((model, idx) => (
              <MenuItem key={idx} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Keterangan (Optional)"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        {isUploading && <CircularProgressWithLabel value={progress} />}
        {!isUploading && (
          <Tooltip title="Upload File">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onChange={(e) => handleUpload(e, true)}
              disabled={berkas === ""}
            >
              <input hidden type="file" />
              <UploadIcon />
            </IconButton>
          </Tooltip>
        )}
      </Paper>
    </CustomCard>
  );
}

export default PelanggaranBerkas;
