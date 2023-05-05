import QRCode from "qrcode";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import defaultImage from "../../../public/Pictures/404-img.png";
import Chip from "@mui/material/Chip";

export function SetQRCode({ text }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (!text) return;
    QRCode.toDataURL(text).then((data) => {
      setSrc(data);
    });
    return () => {
      "cleanup";
    };
  }, [text]);
  return (
    <div>
      <img src={src} alt="QrCode"></img>
    </div>
  );
}

export function WithDynamicImage({
  image = defaultImage,
  altText = "Pemohon",
}) {
  const [initImage, setInitImage] = useState(defaultImage);
  const isImage = /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(image);

  if (!isImage) return <Chip label={`${image} Bukan Gambar`} />;

  useEffect(() => {
    if (!image) return <></>;
    let mounted = true;
    const url = `/api/services/file/public/lapor/${image}`;
    if (mounted)
      axios
        .get(url, {
          responseType: "arraybuffer",
        })
        .then((res) => {
          const buffer64 = Buffer.from(res.data, "binary").toString("base64");
          setInitImage(
            `data:${res.headers["content-type"]};base64, ${buffer64}`
          );
        })
        .catch((err) => {
          console.log(err.response);
        });

    return function cleanup() {
      mounted = false;
    };
  }, [image]);

  return (
    <>
      <a href={initImage.src} target="_blank">
        <Image
          src={initImage}
          alt={altText}
          priority
          width={280}
          height={200}
        />
      </a>
    </>
  );
}
