import { useState } from "react";
import { Box, Typography, AppBar, Tabs, Tab, Container } from "@mui/material";
// ICON
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// Components
import CustomCard from "components/GlobalComponents/Card/CustomCard";
import PageTitleBarWithImage from "components/GlobalComponents/PageTitleBar/PageTitleBarWithImage";

import ProfileFormUtama from "components/Profile/Form/ProfileFormUtama";
import ProfileFormUmum from "components/Profile/Form/ProfileFormUmum";

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

function ProfileSetting(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue((prev) => newValue);
  };
  return (
    <div className="hk-user-settings">
      <Box className={` white-btn-color`}>
        <PageTitleBarWithImage
          title={`Settings Profile`}
          desc="Pengaturan Data Dari Pengguna."
          image="settings.png"
          buttonText={`Profile`}
          buttonLink="/admin/profile"
        />
      </Box>
      <Container maxWidth="lg">
        <Box className="page-space" px={{ xs: "12px", lg: 0 }} mb={4}>
          <CustomCard>
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
              </Tabs>
              <TabPanel value={value} index={0}>
                <Box pt={3}>
                  <ProfileFormUtama />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box pt={3}>
                  <ProfileFormUmum />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Box pt={3}>Form C</Box>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Box pt={3}>Form D</Box>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <Box pt={3}>Form E</Box>
              </TabPanel>
            </Box>
          </CustomCard>
        </Box>
      </Container>
    </div>
  );
}

export default ProfileSetting;
