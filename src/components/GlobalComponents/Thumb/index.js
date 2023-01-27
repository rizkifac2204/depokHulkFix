import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

export default function Thumb({ file, altText = "Pemohon" }) {
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState(undefined);
  const [alt, setAlt] = useState(altText);

  useEffect(() => {
    if (!file) return;
    setLoading(true);
    if (typeof file === "object") {
      var reader = new FileReader();
      reader.onloadend = function () {
        setLoading(false);
        setThumb(reader.result);
        setAlt(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      const url = `/api/services/file/public/foto/${file}`;
      axios
        .get(url, {
          responseType: "arraybuffer",
        })
        .then((res) => {
          const buffer64 = Buffer.from(res.data, "binary").toString("base64");
          setThumb(`data:${res.headers["content-type"]};base64, ${buffer64}`);
        })
        .catch((err) => {
          console.log(err.response);
        })
        .then(() => setLoading(false));
    }
  }, [file, altText]);

  if (!file) {
    return null;
  }
  if (loading) {
    return <p>loading...</p>;
  }

  return <Avatar src={thumb} alt={alt} />;
}
