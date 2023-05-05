import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
// MUI
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// utils
import { formatedDate } from "utils/formatDate";

// components
import ContentLayout from "components/GlobalComponents/ContentLayout";

function LaporAwalDetail({ open, onClose, detail, invalidateQueries }) {
  async function handelDibaca() {
    try {
      const res = await axios.put(`/api/lapor/awal/${detail.id}`);
      invalidateQueries();
      onClose();
      return res.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Terjadi Kesalahan");
    }
  }
  return (
    <Dialog open={open} onClose={onClose} fullScreen={false}>
      <DialogTitle>
        Detail Laporan Awal{" "}
        <Typography variant="caption">
          {detail.dibaca ? "Sudah Dibaca" : "Belum Dibaca"}
        </Typography>
        <br />
        <Typography variant="caption">
          {detail.created_at ? formatedDate(detail.created_at, false) : "-"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="h6">Data Pelapor</Typography>
        </Box>

        <ContentLayout title="Nama">: {detail.nama || "-"}</ContentLayout>
        <ContentLayout title="Telpon/HP">: {detail.telp || "-"}</ContentLayout>
        <ContentLayout title="Email">: {detail.email || "-"}</ContentLayout>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Uraian Kejadian</Typography>
        </Box>

        {detail.uraian}
      </DialogContent>
      <DialogActions>
        {detail.dibaca ? null : (
          <Button onClick={() => handelDibaca()} type="button">
            Tandai Sudah Dibaca
          </Button>
        )}
        <Button onClick={onClose} type="button">
          Tutup
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LaporAwalDetail;
