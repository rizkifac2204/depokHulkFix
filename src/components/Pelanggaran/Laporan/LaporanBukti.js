import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

// icons
import UploadIcon from "@mui/icons-material/Upload";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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

function LaporanBukti({ detail }) {
  const [keterangan, setKeterangan] = useState("");
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!keterangan) return;
    const filename = `${detail.id}_${file.name}`;
    const formData = new FormData();
    formData.append("file", file, filename);
    formData.append("keterangan", keterangan);
    setIsUploading(true);
    axios
      .post(`/api/pelanggaran/laporan/${detail.id}/upload`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          destinationfile: "lapor",
        },
        onUploadProgress: (event) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      })
      .then((res) => {
        queryClient.invalidateQueries(["laporan", detail.id]);
        setKeterangan("");
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .then((res) => {
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
        .delete(`/api/pelanggaran/laporan/${detail.id}/upload`, {
          params: {
            id: item.id,
            file: item.file,
            path: "lapor",
          },
        })
        .then((res) => {
          queryClient.invalidateQueries(["laporan", detail.id]);
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
        });
    }
  };

  return (
    <>
      <ul>
        {detail.bukti.length !== 0 &&
          detail.bukti.map((item) => (
            <li key={item.id}>
              {" "}
              <IconButton
                size="small"
                title="Delete File"
                onClick={() => deleteFile(item)}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </IconButton>
              - {item.keterangan} -{" "}
              <a
                href={"/api/services/file/public/lapor/" + item.file}
                target="_blank"
                rel="noreferrer"
              >
                {item.file}
              </a>
            </li>
          ))}
      </ul>
      {detail.bukti.length === 0 &&
        "Belum Ada Bukti, silakan isi form berikut :"}
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          minWidth: 300,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Keterangan File"
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
              onChange={handleUpload}
              disabled={keterangan === ""}
            >
              <input hidden accept="image/*" type="file" />
              <UploadIcon />
            </IconButton>
          </Tooltip>
        )}
      </Paper>
    </>
  );
}

export default LaporanBukti;
