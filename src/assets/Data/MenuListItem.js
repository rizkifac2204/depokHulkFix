import DashboardIcon from "@mui/icons-material/Dashboard";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
    menu_title: "simpeg",
    path: "admin/simpeg",
    icon: <BadgeIcon />,
    category: "general",
    isMenuOpen: false,
    menu: "simpeg",
    fullPageMenu: false,
    desc: true,
    content: "",
    child_routes: [
      {
        path: "/admin/simpeg",
        menu_title: "semuaDataPegawai",
        icon: <PeopleOutlineIcon />,
        isMenuOpen: false,
        fullPageMenu: false,
        third_child_routes: null,
      },
      {
        path: "/admin/simpeg/add",
        menu_title: "tambahPegawai",
        icon: <PersonAddAltIcon />,
        isMenuOpen: false,
        fullPageMenu: false,
        third_child_routes: null,
      },
      {
        path: "admin/profile",
        menu_title: "profile",
        icon: <></>,
        isMenuOpen: false,
        menu: "profile",
        fullPageMenu: false,
        third_child_routes: [
          {
            path: "/admin/profile",
            menu_title: "profile",
            icon: <></>,
            fourth_child_routes: null,
          },
          {
            path: "/admin/profile/setting",
            menu_title: "settingProfile",
            icon: <></>,
            fourth_child_routes: null,
          },
          {
            path: "/admin/profile/data",
            menu_title: "riwayatDanKeluarga",
            icon: <></>,
            fourth_child_routes: null,
          },
        ],
      },
      {
        path: "/",
        menu_title: "contoh",
        icon: <></>,
        isMenuOpen: false,
        menu: "contoh",
        fullPageMenu: false,
        third_child_routes: [
          {
            path: "/",
            menu_title: "contoh1",
            icon: <></>,
            fourth_child_routes: null,
          },
          {
            path: "/",
            menu_title: "contoh2",
            icon: <></>,
            fourth_child_routes: null,
          },
          {
            path: "/",
            menu_title: "contoh3",
            icon: <></>,
            fourth_child_routes: null,
          },
        ],
      },
    ],
  },
];

export default MenuListItem;
