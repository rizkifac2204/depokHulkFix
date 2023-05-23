import { useState, Fragment } from "react";
import Head from "next/head";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Chip from "@mui/material/Chip";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import { formatedDate, getTime } from "utils/formatDate";
import NotesPerDate from "components/Notes/Components/NotesPerDate";

function Notes() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    message: null,
    severity: null,
    key: new Date().getTime(),
  });

  const handleOpen = (data) => {
    setDetail(data);
    setTimeout(() => {
      setOpen(true);
    });
  };
  const handleClose = () => {
    setDetail({});
    setTimeout(() => {
      setOpen(false);
    });
  };

  const {
    data: notes,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/notes`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const groups = notes
    ? notes.reduce((groups, note) => {
        const date = note.created_at.split("T")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(note);
        return groups;
      }, {})
    : [];

  const notesPerDate = Object.keys(groups).map((date) => {
    return {
      date,
      notes: groups[date],
    };
  });

  function handleDelete(id) {
    const ask = confirm("Yakin Hapus Data?");
    if (ask) {
      axios
        .delete(`/api/notes/${id}`)
        .then((res) => {
          setSnack({
            open: true,
            message: res.data.message,
            severity: "warning",
            key: new Date().getTime(),
          });
          queryClient.invalidateQueries(["notes"]);
        })
        .catch((err) => {
          console.log(err);
          const msg = err?.response?.data?.message
            ? err.response.data.message
            : "Gagal Proses";
          setSnack({
            open: true,
            message: msg,
            severity: "error",
            key: new Date().getTime(),
          });
        });
    }
  }

  function toggleShare(data) {
    axios
      .put(`/api/notes/${data.id}`, data)
      .then((res) => {
        setSnack({
          open: true,
          message: res.data.message,
          severity: "success",
          key: new Date().getTime(),
        });
        queryClient.invalidateQueries(["notes"]);
      })
      .catch((err) => {
        console.log(err);
        const msg = err?.response?.data?.message
          ? err.response.data.message
          : "Gagal Proses";
        setSnack({
          open: true,
          message: msg,
          severity: "error",
          key: new Date().getTime(),
        });
      });
  }

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  function handleCopy(id) {
    const url =
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/notes/${id}`
        : `${process.env.NEXT_PUBLIC_HOST}/notes/${id}`;
    copyTextToClipboard(url)
      .then(() => {
        setSnack({
          open: true,
          message: "Copied",
          severity: "success",
          key: new Date().getTime(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  if (isError)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`An error has occurred: ${error.message}`}</Alert>
    );

  return (
    <div>
      <Head>
        <title>{`Catatan Pribadi - Bawaslu Depok Apps`}</title>
      </Head>
      <SmallTitleBar title="Catatan Pribadi" />
      <Container maxWidth={false} sx={{ mt: 2 }}>
        <Box>
          {notes && notes.length === 0 ? (
            <Alert sx={{ mt: 2 }} severity="info">
              Anda Belum Mempunyai Catatan
            </Alert>
          ) : null}

          {notesPerDate.map((item, idx) => (
            <Fragment key={idx}>
              <NotesPerDate
                data={item}
                handleDelete={handleDelete}
                toggleShare={toggleShare}
                handleCopy={handleCopy}
                handleOpen={handleOpen}
              />
            </Fragment>
          ))}
        </Box>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {Object.keys(detail).length !== 0 ? (
          <>
            <DialogTitle id="alert-dialog-title">
              {detail.judul || "-"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {detail.catatan}
              </DialogContentText>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Box sx={{ m: 2 }}>
                <Typography variant="caption" gutterBottom>
                  Oleh : {detail.nama_admin} - {detail.nama_bawaslu}
                </Typography>
                <br />
                <Typography variant="caption" gutterBottom>
                  {formatedDate(detail.created_at, true)} {" Pukul "}
                  {getTime(detail.created_at)}
                  <br />
                </Typography>
                <Chip
                  size="small"
                  variant="outlined"
                  label={Boolean(detail.share) ? "Dibagikan" : "Pribadi"}
                  {...(Boolean(detail.share) && { color: "secondary" })}
                />
              </Box>
              <Button onClick={handleClose} autoFocus>
                Tutup
              </Button>
            </DialogActions>
          </>
        ) : null}
      </Dialog>

      <Snackbar
        key={snack?.key ? snack.key : undefined}
        open={snack?.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setSnack((prev) => ({ ...prev, open: false }));
        }}
      >
        <Alert severity={snack?.severity} sx={{ width: "100%" }}>
          {snack?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Notes;
