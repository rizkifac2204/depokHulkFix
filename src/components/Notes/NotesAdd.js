import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

//MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const validationSchema = yup.object({
  judul: yup.string(),
  catatan: yup.string("Masukan Nama").required("Harus Diisi"),
});

const handleSubmit = (values, setSubmitting, handleClose, queryClient) => {
  axios
    .post(`/api/notes`, values)
    .then((res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries(["notes"]);
      if (values.share) queryClient.invalidateQueries(["notes", "public"]);
      setTimeout(() => {
        handleClose();
      }, 500);
    })
    .catch((err) => {
      console.log(err);
      const msg = err?.response?.data?.message
        ? err.response.data.message
        : "Gagal Proses";
      toast.error(msg);
    })
    .then(() => {
      setSubmitting(false);
    });
};

function NotesAdd() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      judul: "",
      catatan: "",
      share: false,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting, handleClose, queryClient),
  });

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    formik.resetForm();
    setOpen(false);
  }

  function handleSubmitClick(share, formik) {
    formik.setFieldValue("share", share, formik.handleSubmit());
  }

  return (
    <>
      <Button startIcon={<AddOutlinedIcon />} onClick={() => handleClickOpen()}>
        Note
      </Button>
      <Dialog open={open} onClose={() => handleClose()}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Catatan</DialogTitle>
          <DialogContent>
            <TextField
              label="Judul"
              fullWidth
              variant="standard"
              name="judul"
              value={formik.values.judul}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.judul && Boolean(formik.errors.judul)}
              helperText={formik.touched.judul && formik.errors.judul}
            />
            <TextField
              label="Catatan"
              fullWidth
              variant="standard"
              multiline
              rows={4}
              margin="normal"
              name="catatan"
              value={formik.values.catatan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.catatan && Boolean(formik.errors.catatan)}
              helperText={formik.touched.catatan && formik.errors.catatan}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleClose()}
              startIcon={<CancelOutlinedIcon />}
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => handleSubmitClick(false, formik)}
              startIcon={<SecurityOutlinedIcon />}
            >
              Simpan Pribadi
            </Button>
            <Button
              onClick={(e) => handleSubmitClick(true, formik)}
              startIcon={<ShareOutlinedIcon />}
            >
              Simpan dan Bagikan
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default NotesAdd;
