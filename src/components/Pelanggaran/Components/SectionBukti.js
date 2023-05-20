import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
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

function SectionBukti({ detail, invalidateQueries, param }) {
  const [keterangan, setKeterangan] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e, isFile) => {
    if (!keterangan) return;
    const file = isFile ? e.target.files[0] : null;
    const filename = `${detail.id}_${file?.name || "nofile"}`;
    const formData = new FormData();
    isFile
      ? formData.append("file", file, filename)
      : formData.append("file", file);
    formData.append("keterangan", keterangan);
    isFile ? setIsUploading(true) : setIsSubmitting(true);
    axios
      .post(`/api/pelanggaran/${param}/${detail.id}/upload`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          destinationfile: "pelanggaran/bukti",
        },
        onUploadProgress: (event) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      })
      .then((res) => {
        setKeterangan("");
        toast.success(res.data.message);
        invalidateQueries();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .then(() => {
        isFile ? setIsUploading(false) : setIsSubmitting(false);
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
        .delete(`/api/pelanggaran/${param}/${detail.id}/upload`, {
          params: {
            id: item.id,
            file: item.file,
            path: "pelanggaran/bukti",
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

  return (
    <>
      <ul>
        {detail.bukti.length !== 0 &&
          detail.bukti.map((item) => (
            <li key={item.id}>
              <IconButton
                size="small"
                title="Delete File"
                onClick={() => deleteFile(item)}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </IconButton>
              {item.keterangan}
              {item.file ? (
                <>
                  {" - "}
                  <a
                    href={
                      "/api/services/file/public/pelanggaran/bukti/" + item.file
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.file}
                  </a>
                </>
              ) : null}
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
          placeholder="Nama Bukti / Keterangan"
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
              disabled={keterangan === ""}
            >
              <input hidden type="file" />
              <UploadIcon />
            </IconButton>
          </Tooltip>
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        {isSubmitting && <CircularProgressWithLabel value={progress} />}
        {!isSubmitting && (
          <Tooltip title="Simpan Keterangan">
            <span>
              <Button
                variant="text"
                disabled={keterangan === ""}
                size="small"
                onClick={(e) => handleUpload(e, false)}
              >
                Simpan Tanpa Upload
              </Button>
            </span>
          </Tooltip>
        )}
      </Paper>

      <Divider sx={{ mt: 2 }} />
    </>
  );
}

export default SectionBukti;
