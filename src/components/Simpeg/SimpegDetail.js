import Link from "next/link";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";

import Thumb from "components/GlobalComponents/Thumb";

function SimpegDetail({ user }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  function handleDelete() {
    const ask = confirm("Yakin Hapus Data?");
    if (ask) {
      axios
        .delete(`/api/simpeg/${user.id}`)
        .then((res) => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          toast.success(res.data.message);
          setTimeout(() => {
            router.push(`/admin/simpeg`);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
  }
  return (
    <div className="mod-profile-wrap">
      <Box py={3} className="mod-profile">
        <div
          className="mod-profile-header"
          style={{
            backgroundImage: "url('/Pictures/blog-8.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
        <Box className="mod-profile-detail">
          <Box>
            <div className="user-avatar">
              <Thumb file={user.foto_admin} alt={user.nama_admin} />
            </div>
            <Box>
              <Typography variant="h6">{user.nama_admin}</Typography>
              <Typography
                variant="body2"
                className="text-disabled"
                style={{ marginBottom: "5px" }}
              >
                @{user.nama_level || "-"}
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "5px" }}>
                {user.nama_bawaslu}
              </Typography>
              <div className="mod-profile-meta mod-profile-bio">
                <ul>
                  <li>
                    <PhoneAndroidOutlinedIcon fontSize="small" />
                    <span>{user.telp_admin || "-"}</span>
                  </li>
                  <li>
                    <AlternateEmailOutlinedIcon fontSize="small" />
                    <span>{user.email_admin || "-"}</span>
                  </li>
                </ul>
              </div>
              <div className="mod-profile-meta mod-profile-meta--followers ">
                <ul>
                  {user.verifikator ? (
                    <li>
                      <Tooltip title="Verifikator Data Pegawai">
                        <Typography variant="h6" className="mr-1">
                          <KeyOutlinedIcon fontSize="small" />{" "}
                        </Typography>
                      </Tooltip>
                      <Typography variant="body2">
                        Verifikator Data Pegawai
                      </Typography>
                    </li>
                  ) : null}
                </ul>
              </div>
            </Box>
          </Box>
          {user.editable && !user.myself && (
            <Box className="user-detail--btn text-right">
              <Button
                size="small"
                variant="outlined"
                color="primary"
                sx={{ mr: 1 }}
                component={Link}
                href={`/admin/simpeg/${user.id}/edit`}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleDelete}
              >
                Hapus
              </Button>
            </Box>
          )}
          {user.myself && (
            <Box className="user-detail--btn text-right">
              <Button
                size="small"
                variant="outlined"
                color="primary"
                component={Link}
                href={`/admin/profile/setting`}
              >
                Update
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default SimpegDetail;
