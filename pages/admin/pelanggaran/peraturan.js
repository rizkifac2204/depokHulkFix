import Head from "next/head";
import { useRef, useState } from "react";

// MUI
import Container from "@mui/material/Container";

function Peraturan() {
  const ref = useRef();
  const [height, setHeight] = useState("0px");

  const onLoad = () => {
    setHeight(ref.current.contentWindow.document.body.scrollHeight + "px");
  };

  return (
    <>
      <Head>
        <title>{`Peraturan Penanganan dan Temuan Pelanggaran - Bawaslu Depok Apps`}</title>
      </Head>
      <Container maxWidth={false}>
        <iframe
          ref={ref}
          onLoad={onLoad}
          src="/doc/peraturanbawaslunomor7tahun2022.pdf"
          width="100%"
          height="700px"
        />
      </Container>
    </>
  );
}

export default Peraturan;
