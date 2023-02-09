import { useState } from "react";

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

function NotesAdd() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button startIcon={<AddOutlinedIcon />} onClick={handleClickOpen}>
        Note
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Catatan</DialogTitle>
        <DialogContent>
          <TextField autoFocus label="Judul" fullWidth variant="standard" />
          <TextField
            label="Catatan"
            fullWidth
            variant="standard"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} startIcon={<CancelOutlinedIcon />}>
            Cancel
          </Button>
          <Button onClick={handleClose} startIcon={<SecurityOutlinedIcon />}>
            Simpan Pribadi
          </Button>
          <Button onClick={handleClose} startIcon={<ShareOutlinedIcon />}>
            Simpan dan Bagikan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NotesAdd;
