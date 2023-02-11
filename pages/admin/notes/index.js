import { useState, Fragment } from "react";
import Head from "next/head";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";
import { formatedDate, getTime } from "utils/formatDate";

function truncateString(str, num = 100) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function Notes() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    message: null,
    severity: "success",
  });

  const handleClickOpen = (data) => {
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
          });
          queryClient.invalidateQueries(["notes"]);
        })
        .catch((err) => {
          console.log(err);
          const msg = err?.response?.data?.message
            ? err.response.data.message
            : "Gagal Proses";
          setSnack({ open: true, message: msg, severity: "error" });
        });
    }
  }

  function handleToggleShare(data) {
    axios
      .put(`/api/notes/${data.id}`, data)
      .then((res) => {
        setSnack({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        queryClient.invalidateQueries(["notes"]);
      })
      .catch((err) => {
        console.log(err);
        const msg = err?.response?.data?.message
          ? err.response.data.message
          : "Gagal Proses";
        setSnack({ open: true, message: msg, severity: "error" });
      });
  }

  function handleCopy(id) {
    console.log(id);
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
        <title>{`Catatan Pribadi - Bawaslu Depok  Apps`}</title>
      </Head>
      <SmallTitleBar title="Catatan Pribadi" />
      <Container maxWidth={false} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {notes.map((item) => (
            <Fragment key={item.tanggal}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="div">
                  {formatedDate(item.tanggal, true)}
                </Typography>
                <Divider />
              </Grid>
              {item.listdata.map((data, idx) => (
                <Grid item xs={12} sm={4} md={3} key={idx}>
                  <Card>
                    <CardContent>
                      <Box display="flex" justifyContent="flex-end">
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          gutterBottom
                        >
                          {getTime(data.created_at)}
                        </Typography>
                      </Box>

                      <Typography gutterBottom variant="h5" component="div">
                        {data.judul || "-"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {truncateString(data.catatan)}
                      </Typography>
                      <Divider sx={{ mb: 1 }} />

                      <Typography variant="caption" gutterBottom>
                        {data.nama_admin} - {data.nama_bawaslu}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{ py: 0 }}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(data.id)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                      <IconButton
                        aria-label="share"
                        onClick={() => handleToggleShare(data)}
                      >
                        <ShareOutlinedIcon
                          color={Boolean(data.share) ? "secondary" : ""}
                        />
                      </IconButton>
                      <IconButton
                        aria-label="copy link"
                        onClick={() => handleCopy(data.id)}
                      >
                        <ContentCopyOutlinedIcon />
                      </IconButton>
                      <IconButton
                        aria-label="share"
                        sx={{ marginLeft: "auto" }}
                        onClick={() => handleClickOpen(data)}
                      >
                        <ZoomInOutlinedIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
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
                  {Boolean(detail.share) ? "Dibagikan" : "Pribadi"}
                </Typography>
              </Box>
              <Button onClick={handleClose} autoFocus>
                Tutup
              </Button>
            </DialogActions>
          </>
        ) : null}
      </Dialog>

      <Snackbar
        open={snack.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={() => {
          setSnack({ open: false, message: null });
        }}
      >
        <Alert
          onClose={() => {
            setSnack({ open: false, message: null });
          }}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Notes;
