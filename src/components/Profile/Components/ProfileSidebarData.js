import { useState } from "react";
import Link from "next/link";

// MUI
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// Icon keluarga
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChildFriendlyOutlinedIcon from "@mui/icons-material/ChildFriendlyOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
// Icon Riwayat
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AssistantOutlinedIcon from "@mui/icons-material/AssistantOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

const keluarga = [
  {
    icon: <FavoriteBorderOutlinedIcon />,
    label: "Suami/Istri",
    path: "/admin/profile/data/suasi",
  },
  {
    icon: <ChildFriendlyOutlinedIcon />,
    label: "Anak",
    path: "/admin/profile/data/anak",
  },
  {
    icon: <SupervisedUserCircleOutlinedIcon />,
    label: "Orang Tua",
    path: "/admin/profile/data/orangtua",
  },
  {
    icon: <Diversity2OutlinedIcon />,
    label: "Saudara",
    path: "/admin/profile/data/saudara",
  },
];

const riwayat = [
  {
    icon: <AttachMoneyOutlinedIcon />,
    label: "Gaji",
    path: "/admin/profile/data/gaji",
  },
  {
    icon: <AssistantOutlinedIcon />,
    label: "Jabatan",
    path: "/admin/profile/data/jabatan",
  },
  {
    icon: <TravelExploreOutlinedIcon />,
    label: "Keluar Negeri",
    path: "/admin/profile/data/keluarnegeri",
  },
  {
    icon: <WorkspacePremiumOutlinedIcon />,
    label: "Kepangkatan",
    path: "/admin/profile/data/kepangkatan",
  },
  {
    icon: <CastForEducationOutlinedIcon />,
    label: "Kursus",
    path: "/admin/profile/data/kursus",
  },
  {
    icon: <CorporateFareOutlinedIcon />,
    label: "Organisasi",
    path: "/admin/profile/data/organisasi",
  },
  {
    icon: <SchoolOutlinedIcon />,
    label: "Pendidikan",
    path: "/admin/profile/data/pendidikan",
  },
  {
    icon: <ThumbUpAltOutlinedIcon />,
    label: "Tanda Jasa",
    path: "/admin/profile/data/tandajasa",
  },
];

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

function ProfileSidebarData() {
  const [keluargaOpen, setKeluargaOpen] = useState(true);
  const [riwayatOpen, setRiwayatOpen] = useState(true);
  return (
    <Box sx={{ height: "100%" }}>
      <Paper elevation={0}>
        <FireNav component="nav" disablePadding>
          <Box>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setKeluargaOpen(!keluargaOpen)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: keluargaOpen ? 1 : 2.5,
                "&:hover, &:focus": {
                  "& svg": { opacity: keluargaOpen ? 1 : 0 },
                },
              }}
            >
              <ListItemText
                primary="Keluarga"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
                secondary={
                  keluargaOpen
                    ? null
                    : "Data Suami/Istri, Data Anak, Data Orang Tua Saudara"
                }
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: keluargaOpen ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
            <Divider />
            {keluargaOpen &&
              keluarga.map((item) => (
                <ListItemButton
                  key={item.label}
                  sx={{ py: 0, minHeight: 32 }}
                  component={Link}
                  href={item.path}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 12,
                    }}
                  />
                </ListItemButton>
              ))}
          </Box>
        </FireNav>
      </Paper>
      <Paper elevation={0}>
        <FireNav component="nav" disablePadding>
          <Box>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setRiwayatOpen(!riwayatOpen)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: riwayatOpen ? 1 : 2.5,
                "&:hover, &:focus": {
                  "& svg": { opacity: riwayatOpen ? 1 : 0 },
                },
              }}
            >
              <ListItemText
                primary="Riwayat"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
                secondary={
                  riwayatOpen
                    ? null
                    : "Pendidikan, Kepangkatan, Organisasi, Tanda Jasa, Kursus"
                }
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: riwayatOpen ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
            <Divider />
            {riwayatOpen &&
              riwayat.map((item) => (
                <ListItemButton
                  key={item.label}
                  sx={{ py: 0, minHeight: 32 }}
                  component={Link}
                  href={item.path}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 12,
                    }}
                  />
                </ListItemButton>
              ))}
          </Box>
        </FireNav>
      </Paper>
    </Box>
  );
}

export default ProfileSidebarData;
