import { Scrollbars } from "react-custom-scrollbars";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import Header from "components/Home/Header";
import MainFeaturedPost from "components/Home/MainFeaturedPost";
import FeaturedPost from "components/Home/FeaturedPost";
import Main from "components/Home/Main";
import Sidebar from "components/Home/Sidebar";
import Footer from "components/Home/Footer";

import Head from "next/head";
import config from "constants/AppConfig";

const mainFeaturedPost = {
  title: "Selamat Datang Di Aplikasi Bawaslu Kota Depok",
  description:
    "Sahabat dapat melaporkan Dugaan Pelanggaran pada Formulir yang sudah kami sediakan",
  image: "/api/services/file/public/Pictures/bg-bawaslu.jpg",
  imageText: "bawaslu kota depok",
  link: "https://kotadepok.bawaslu.go.id",
};

const featuredPosts = [
  {
    title: "Website Bawaslu",
    description: "Lihat Berita-berita dan kabar terbaru dari Bawaslu.",
    image: "/api/services/file/public/Pictures/website.png",
    imageLabel: "Image Text",
  },
  {
    title: "PPID",
    description:
      "Lihat informasi dan Ajukan Permohonan Informasi yang sahabat ingin ketahui disini.",
    image: "/api/services/file/public/Pictures/ppid.png",
    imageLabel: "Image Text",
    link: "https://ppid.kotadepok.bawaslu.go.id",
  },
];

const sidebar = {
  social: [
    {
      name: "Instagram",
      icon: InstagramIcon,
      link: "https://www.instagram.com/bawasludepok/?hl=id",
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      link: "https://twitter.com/BawasluDepok_",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      link: "https://www.facebook.com/BawasluDepok/",
    },
  ],
};

function Home() {
  return (
    <>
      <Head>
        <title>{`Selamat Datang di ${config.brandName} `}</title>
      </Head>

      <Scrollbars style={{ height: `100vh` }}>
        <Container maxWidth={"lg"}>
          <Header title="Bawaslu Kota Depok" />
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid>
            <Grid container spacing={5} sx={{ my: 3 }}>
              <Main title="Formulir Laporan Cepat" />
              <Sidebar
                description={sidebar.description}
                social={sidebar.social}
              />
            </Grid>
          </main>
        </Container>
        <Footer
          title="Cegah, Awasi, Tindak"
          description="Jl. Karya Pemuda No.2, RT.02/RW.04, Beji Tim., Kecamatan Beji, Kota Depok, Jawa Barat 16422"
        />
      </Scrollbars>
    </>
  );
}

Home.fullPage = true;
export default Home;
