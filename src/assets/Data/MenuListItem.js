import DashboardIcon from "@mui/icons-material/Dashboard";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const MenuListItem = [
  {
    menu_title: "dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
    category: "general",
    isMenuOpen: false,
    menu: "dashboard",
    fullPageMenu: false,
    desc: true,
    content: "",
    child_routes: null,
  },
  {
    menu_title: "profile",
    path: "/admin/profile",
    icon: <AccountCircleOutlinedIcon />,
    category: "general",
    isMenuOpen: false,
    menu: "profile",
    fullPageMenu: false,
    desc: true,
    content: "",
    child_routes: [
      {
        path: "/admin/profile",
        menu_title: "profile",
        icon: <></>,
        isMenuOpen: false,
        fullPageMenu: false,
        third_child_routes: null,
      },
      {
        path: "/admin/profile/setting",
        menu_title: "settingProfile",
        icon: <></>,
        isMenuOpen: false,
        fullPageMenu: false,
        third_child_routes: null,
      },
      {
        path: "/admin/profile/data",
        menu_title: "riwayatDanKeluarga",
        icon: <></>,
        isMenuOpen: false,
        fullPageMenu: false,
        third_child_routes: null,
      },
    ],
  },
  {
    menu_title: "simpeg",
    path: "/admin/simpeg",
    icon: <BadgeIcon />,
    category: "sdmo",
    isMenuOpen: false,
    menu: "simpeg",
    fullPageMenu: false,
    desc: true,
    content: "",
    child_routes: [
      {
        path: "/admin/simpeg",
        menu_title: "dataPegawai",
        icon: <></>,
        isMenuOpen: false,
        fullPageMenu: false,
        third_child_routes: null,
      },
      {
        path: "/admin/simpeg/add",
        menu_title: "tambahPegawai",
        icon: <></>,
        isMenuOpen: false,
        fullPageMenu: false,
        third_child_routes: null,
        limit_access_level: [1, 2, 3, 4, 5, 6],
      },
    ],
  },
];

export default MenuListItem;
