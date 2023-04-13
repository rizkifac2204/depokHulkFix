import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

// ICON
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LockPersonIcon from "@mui/icons-material/LockPerson";

// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { Tabs, Tab } from "@mui/material";

// Components
import CustomCard from "components/GlobalComponents/Card/CustomCard";

import ProfileDetail from "components/Profile/ProfileDetail";

import SimpegFormUtama from "components/Simpeg/Form/SimpegFormUtama";
import SimpegFormUmum from "components/Simpeg/Form/SimpegFormUmum";
import SimpegFormAlamat from "components/Simpeg/Form/SimpegFormAlamat";
import SimpegFormBadan from "components/Simpeg/Form/SimpegFormBadan";
import SimpegFormNomor from "components/Simpeg/Form/SimpegFormNomor";
import SimpegFormPassword from "components/Simpeg/Form/SimpegFormPassword";

function TabPanel(props) {
  const { children, value, index, dir, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
      dir={dir}
    >
      {value === index && <Box p={{ xs: "12px", sm: 2 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

function SimpegEdit() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue((prev) => newValue);
  };

  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;

  const {
    data: user,
    refetch,
    isError,
    isLoading,
    error,
  } = useQuery({
    enabled: !!id,
    queryKey: ["user", id],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/simpeg/${id}`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  function deleteCallback() {
    function onSuccess(data) {
      toast.success(data.message || "Sukses");
      queryClient.invalidateQueries(["users"]);
      setTimeout(() => {
        router.push(`/admin/simpeg`);
      }, 2000);
    }

    function onError(err) {
      toast.error(err.message);
    }

    return { onSuccess, onError };
  }

  if (isLoading) return <LinearProgress sx={{ height: "4px" }} />;
  if (isError)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`An error has occurred: ${error.message}`}</Alert>
    );

  if (!user.editable)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`Tidak Ada Izin Mengubah User Ini`}</Alert>
    );

  return (
    <>
      <Head>
        <title>{`Edit Pegawai - Bawaslu Depok  Apps`}</title>
      </Head>
      <Container maxWidth={false}>
        <Box mt={2} px={{ xs: "12px", lg: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
              <CustomCard caption={`Formulir Edit Data Pegawai`}>
                <Box>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab
                      icon={<EngineeringOutlinedIcon />}
                      iconPosition="start"
                      label="Utama"
                      {...a11yProps(0)}
                    />
                    <Tab
                      icon={<PersonSearchOutlinedIcon />}
                      iconPosition="start"
                      label="Informasi Umum"
                      {...a11yProps(1)}
                    />
                    <Tab
                      icon={<HomeOutlinedIcon />}
                      iconPosition="start"
                      label="Alamat"
                      {...a11yProps(2)}
                    />
                    <Tab
                      icon={<PsychologyOutlinedIcon />}
                      iconPosition="start"
                      label="Keterangan Badan"
                      {...a11yProps(3)}
                    />
                    <Tab
                      icon={<PaymentOutlinedIcon />}
                      iconPosition="start"
                      label="Informasi Lainnya"
                      {...a11yProps(4)}
                    />
                    <Tab
                      icon={<LockPersonIcon />}
                      iconPosition="start"
                      label="Keamanan"
                      {...a11yProps(5)}
                    />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Box pt={3}>
                      <SimpegFormUtama user={user} refetch={refetch} />
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Box pt={3}>
                      <SimpegFormUmum user={user} />
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Box pt={3}>
                      <SimpegFormAlamat user={user} />
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <Box pt={3}>
                      <SimpegFormBadan user={user} />
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    <Box pt={3}>
                      <SimpegFormNomor user={user} />
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    <Box pt={3}>
                      <SimpegFormPassword user={user} />
                    </Box>
                  </TabPanel>
                </Box>
              </CustomCard>
            </Grid>
            <Grid item lg={3}>
              {Object.keys(user).length !== 0 ? (
                <Box pt={3} sx={{ display: { xs: "none", lg: "block" } }}>
                  <ProfileDetail
                    profile={user}
                    isUser={true}
                    deleteCallback={deleteCallback}
                  />
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default SimpegEdit;
