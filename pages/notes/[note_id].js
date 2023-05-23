import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  Grid,
  Box,
  Typography,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { getTime, formatedDate } from "utils/formatDate";

function SharedNotes() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const { note_id } = router.query;

  const {
    data: detail,
    isError,
    isLoading,
    error,
  } = useQuery({
    enabled: !!note_id,
    queryKey: ["shared", note_id],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/notes/${note_id}/shared`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

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
    <>
      <Head>
        <title>{`Catatan Dibagikan - Bawaslu Depok Apps`}</title>
      </Head>

      <div className="pricing-update">
        <Grid container direction="row">
          <Grid item xs={12} sm={12}>
            <Grid container direction="row">
              <Grid item xs={12} sm={10} className="up-main-col">
                <Box py={7}>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      aria-label="close"
                      onClick={() => router.back()}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Box
                      pl={1}
                      fontSize="h5.fontSize"
                      fontWeight="h5.fontWeight"
                    >
                      Catatan Dibagikan
                    </Box>
                  </Box>
                  <Box pl={1} className="vertical-stepper-wrap">
                    <Stepper activeStep={activeStep} orientation="vertical">
                      <Step>
                        <StepLabel>
                          <Box my={1}>
                            <Typography variant="h6">
                              {detail?.judul || "-"}
                            </Typography>
                          </Box>
                        </StepLabel>
                        <StepContent className="stepper-content">
                          <Box className="bg-scroller">
                            {detail?.catatan || "-"}
                          </Box>

                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              setActiveStep(
                                (prevActiveStep) => prevActiveStep + 1
                              )
                            }
                          >
                            Pembuat
                          </Button>
                        </StepContent>
                      </Step>
                      <Step>
                        <StepLabel>
                          <Box>
                            <Typography variant="h6">Pembuat</Typography>
                          </Box>
                        </StepLabel>
                        <StepContent className="stepper-content">
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <ImageIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={`${detail.nama_admin} - ${detail.nama_bawaslu}`}
                                secondary={`${formatedDate(
                                  detail.created_at,
                                  true
                                )} pukul ${getTime(detail.created_at)}`}
                              />
                            </ListItem>
                          </List>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              setActiveStep(
                                (prevActiveStep) => prevActiveStep - 1
                              )
                            }
                          >
                            Kembali
                          </Button>
                        </StepContent>
                      </Step>
                    </Stepper>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} className="md-hide">
                <Box className="update-img-wrap">
                  <Image
                    src={"/Images/notes.png"}
                    alt="Catatan"
                    width="474"
                    height="559"
                    className="update-img-thumb"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

SharedNotes.fullPage = true;
export default SharedNotes;
