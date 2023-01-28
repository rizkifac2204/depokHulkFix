import { useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Grid,
  TextField,
  Button,
  LinearProgress,
  Fab,
  Box,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useRizkiContext } from "context/AppContext";

function Login() {
  const router = useRouter();
  const [init] = useRizkiContext();
  const { isDarkModeActive } = init;

  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    blankUsername: false,
    blankPassword: false,
  });

  function onUserLogin(e) {
    e.preventDefault();
    setError(false);
    setLoading(true);
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      setError(true);
      setLoading(false);
      toast.error("Mohon Isi Data Yang Diperlukan", { autoClose: 2000 });
      return;
    }
    axios
      .post(`/api/auth/loginCredential`, {
        username: username,
        password: password,
      })
      .then((res) => {
        toast.success("Mengalihkan Halaman", { autoClose: 2000 });
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response);
        setError(true);

        const msg = err.response.data.message
          ? err.response.data.message
          : "Terjadi Kesalahan";
        toast.error(msg, { autoClose: 2000 });
      })
      .then(() => {
        setLoading(false);
      });
  }

  function onUsernameChanged() {
    const value = usernameRef.current.value;
    if (!value) {
      setFormErrors((prev) => ({ ...prev, blankUsername: true }));
    } else {
      setFormErrors((prev) => ({ ...prev, blankUsername: false }));
    }
  }

  function onPasswordChanged() {
    const value = passwordRef.current.value;
    if (!value) {
      setFormErrors((prev) => ({ ...prev, blankPassword: true }));
    } else {
      setFormErrors((prev) => ({ ...prev, blankPassword: false }));
    }
  }

  return (
    <div>
      <Head>
        <title>{`Sign In`}</title>
      </Head>
      {loading && <LinearProgress sx={{ height: "4px" }} />}
      <div className="session-wrapper">
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={12} md={6} lg={4} className="login-wrap">
            <div className="login-wrapper text-center">
              <div className="w-100">
                <div className="session-logo">
                  {isDarkModeActive ? (
                    <Image
                      alt="img"
                      width="100"
                      height="25"
                      src={`/Pictures/logo-light.png`}
                      priority
                    />
                  ) : (
                    <Image
                      alt="img"
                      width="100"
                      height="25"
                      src={`/Pictures/logo-dark.png`}
                      priority
                    />
                  )}
                </div>
                <form className="login-form" onSubmit={(e) => onUserLogin(e)}>
                  <Box mb={3}>
                    <TextField
                      inputRef={usernameRef}
                      variant="standard"
                      required
                      fullWidth
                      id="username"
                      name="username"
                      label="Username"
                      placeholder="Please enter your username."
                      className=""
                      onChange={() => onUsernameChanged()}
                      error={formErrors.blankUsername || error ? true : false}
                    />
                    {formErrors.blankUsername && (
                      <Box
                        component="span"
                        color="error.main"
                        textAlign="left"
                        display="block"
                        fontSize="subtitle2.fontSize"
                        pt={1}
                      >
                        Username Tidak Boleh Kosong
                      </Box>
                    )}
                  </Box>
                  <Box mb={3}>
                    <TextField
                      inputRef={passwordRef}
                      variant="standard"
                      required
                      fullWidth
                      id="login-password"
                      label="Password"
                      placeholder="Please enter your login password."
                      className=""
                      type="password"
                      error={formErrors.blankPassword || error ? true : false}
                      onChange={onPasswordChanged.bind(this)}
                    />
                    {formErrors.blankPassword && (
                      <Box
                        component="span"
                        color="error.main"
                        textAlign="left"
                        display="block"
                        fontSize="subtitle2.fontSize"
                        pt={1}
                      >
                        Password Tidak Boleh Kosong
                      </Box>
                    )}
                  </Box>
                  <Box mb="40px" pt="20px">
                    <Button
                      color="primary"
                      className="btn-block blockBtn w-100"
                      variant="contained"
                      size="large"
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Box>
                  <div className="social-login-wrapper">
                    <Typography variant="body2">Sign in with</Typography>
                    <div className="social-list">
                      <Fab
                        size="small"
                        variant="circular"
                        className="text-white facebook-color"
                        onClick={() => {
                          console.log("google");
                        }}
                      >
                        <GoogleIcon />
                      </Fab>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={8}
            style={{
              backgroundImage: "url(/Images/session1bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center right",
            }}
            className="img-session"
          >
            <div className="login-content">
              <Box
                fontSize="h1.fontSize"
                fontWeight="h1.fontWeight"
                mb={4}
                color="common.white"
              >
                Badan Pengawas Pemilihan Umum Kota Depok
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Login.fullPage = true;
export default Login;
