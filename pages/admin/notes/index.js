import { useState } from "react";
import Head from "next/head";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

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

function Notes() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Head>
        <title>{`Catatan Pribadi - Bawaslu Depok  Apps`}</title>
      </Head>
      <SmallTitleBar title="Catatan Pribadi" />
      <Container maxWidth={false} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="div">
              21 Januari 2023
            </Typography>
            <Divider />
          </Grid>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={4} md={3} key={item}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="flex-end">
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      gutterBottom
                    >
                      Pukul 10:30
                    </Typography>
                  </Box>

                  <Typography gutterBottom variant="h5" component="div">
                    Judul
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Isi Dari Catatan Isi Dari Catatan Isi Dari Catatan Isi Dari
                    Catatan Isi Dari Catatan Isi Dari Catatan Isi Dari Catatan
                    Isi Dari Catatan Isi Dari Catatan Isi Dari Catatan Isi Dari
                    Catatan ...
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="caption" gutterBottom>
                    Fazri M Fahmi - Kecamatan Bojongsari
                  </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ py: 0 }}>
                  <IconButton aria-label="delete">
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareOutlinedIcon />
                  </IconButton>
                  <IconButton aria-label="copy link">
                    <ContentCopyOutlinedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="share"
                    sx={{ marginLeft: "auto" }}
                    onClick={handleClickOpen}
                  >
                    <ZoomInOutlinedIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="div">
              20 Januari 2023
            </Typography>
            <Divider />
          </Grid>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <Grid item xs={12} sm={4} md={3} key={item}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="flex-end">
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      gutterBottom
                    >
                      Pukul 10:30
                    </Typography>
                  </Box>
                  <Typography gutterBottom variant="h5" component="div">
                    Judul
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Isi Dari Catatan Isi Dari Catatan Isi Dari Catatan Isi Dari
                    Catatan Isi Dari Catatan Isi Dari Catatan Isi Dari Catatan
                    Isi Dari Catatan Isi Dari Catatan Isi Dari Catatan Isi Dari
                    Catatan ...
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="caption" gutterBottom>
                    Fazri M Fahmi - Kecamatan Bojongsari
                  </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ py: 0 }}>
                  <IconButton aria-label="delete">
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareOutlinedIcon />
                  </IconButton>
                  <IconButton aria-label="copy link">
                    <ContentCopyOutlinedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="share"
                    sx={{ marginLeft: "auto" }}
                    onClick={handleClickOpen}
                  >
                    <ZoomInOutlinedIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Judul Catatan"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Notes;
