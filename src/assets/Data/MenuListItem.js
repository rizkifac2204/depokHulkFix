import DashboardIcon from "@mui/icons-material/Dashboard";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

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
        limit_access_level: [1, 2, 3, 4, 5],
      },
      {
        path: "/admin/profile/data",
        menu_title: "riwayatDanKeluarga",
        icon: <></>,
        isMenuOpen: false,
        fullPageMenu: false,
        third_child_routes: null,
        limit_access_level: [1, 2, 3, 4, 5],
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
  {
    menu_title: "pelanggaran",
    path: "/admin/pelanggaran",
    icon: <ReportGmailerrorredIcon />,
    category: "ppdatin",
    isMenuOpen: false,
    menu: "pelanggaran",
    fullPageMenu: false,
    desc: true,
    content: "",
    child_routes: [
      {
        menu_title: "laporanAwal",
        path: "/admin/pelanggaran/awal",
        icon: <></>,
        isMenuOpen: false,
        fullPageMenu: false,
        third_child_routes: null,
        limit_access_level: [1, 2, 3, 4, 5],
      },
      {
        menu_title: "laporan",
        path: "/admin/pelanggaran/laporan",
        icon: <></>,
        isMenuOpen: false,
        fullPageMenu: false,
        limit_access_level: [1, 2, 3, 4, 5],
        third_child_routes: [
          {
            menu_title: "dataLaporan",
            path: "/admin/pelanggaran/laporan",
            icon: <></>,
            isMenuOpen: false,
            fullPageMenu: false,
          },
          {
            menu_title: "formulirB.1",
            path: "/admin/pelanggaran/laporan/add",
            icon: <></>,
            isMenuOpen: false,
            fullPageMenu: false,
          },
          {
            menu_title: "dataPelapor",
            path: "/admin/pelanggaran/laporan/pelapor",
            icon: <></>,
            isMenuOpen: false,
            fullPageMenu: false,
          },
        ],
      },
      {
        menu_title: "temuan",
        path: "/admin/pelanggaran/temuan",
        icon: <></>,
        isMenuOpen: false,
        fullPageMenu: false,
        limit_access_level: [1, 2, 3, 4, 5],
        third_child_routes: [
          {
            menu_title: "dataTemuan",
            path: "/admin/pelanggaran/temuan",
            icon: <></>,
            isMenuOpen: false,
            fullPageMenu: false,
          },
          {
            menu_title: "formulirB.2",
            path: "/admin/pelanggaran/temuan/add",
            icon: <></>,
            isMenuOpen: false,
            fullPageMenu: false,
          },
        ],
      },
    ],
  },
  // {
  //   menu_title: "notes",
  //   path: "/admin/notes",
  //   icon: <StickyNote2OutlinedIcon />,
  //   category: "pph",
  //   isMenuOpen: false,
  //   menu: "notes",
  //   fullPageMenu: false,
  //   desc: true,
  //   content: "",
  //   child_routes: [
  //     {
  //       path: "/admin/notes",
  //       menu_title: "catatanPribadi",
  //       icon: <></>,
  //       isMenuOpen: false,
  //       fullPageMenu: false,
  //       third_child_routes: null,
  //     },
  //     {
  //       path: "/admin/notes/public",
  //       menu_title: "catatanPublik",
  //       icon: <></>,
  //       isMenuOpen: false,
  //       fullPageMenu: false,
  //       third_child_routes: null,
  //     },
  //   ],
  // },
  // {
  //   menu_title: "forma",
  //   path: "/admin/form-a",
  //   icon: <FormatColorTextOutlinedIcon />,
  //   category: "pph",
  //   isMenuOpen: false,
  //   menu: "forma",
  //   fullPageMenu: false,
  //   desc: true,
  //   content: "",
  //   child_routes: [
  //     {
  //       path: "/admin/form-a",
  //       menu_title: "dataFormA",
  //       icon: <></>,
  //       isMenuOpen: false,
  //       fullPageMenu: false,
  //       third_child_routes: null,
  //     },
  //     {
  //       path: "/admin/form-a/add",
  //       menu_title: "tambahFormA",
  //       icon: <></>,
  //       isMenuOpen: false,
  //       fullPageMenu: false,
  //       third_child_routes: null,
  //     },
  //   ],
  // },
  // {
  //   menu_title: "cyberPatrol",
  //   path: "/admin/cyber",
  //   icon: <PolicyOutlinedIcon />,
  //   category: "pph",
  //   isMenuOpen: false,
  //   menu: "cyber",
  //   fullPageMenu: false,
  //   desc: true,
  //   content: "",
  //   child_routes: [
  //     {
  //       path: "/admin/cyber",
  //       menu_title: "data",
  //       icon: <></>,
  //       isMenuOpen: false,
  //       fullPageMenu: false,
  //       third_child_routes: null,
  //     },
  //     {
  //       path: "/admin/cyber/add",
  //       menu_title: "tambahData",
  //       icon: <></>,
  //       isMenuOpen: false,
  //       fullPageMenu: false,
  //       third_child_routes: null,
  //     },
  //   ],
  // },
];

export default MenuListItem;
