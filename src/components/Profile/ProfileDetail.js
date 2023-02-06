import { makeStyles } from "@mui/styles";
import { Typography, Fab, Box, Divider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// icons
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
// utils
import { formatedDate } from "utils/formatDate";

//component
import { SocialIcons } from "components/GlobalComponents/SocialIcons";
import Wait from "components/GlobalComponents/Wait";
import Thumb from "components/GlobalComponents/Thumb";
import FotoAction from "components/GlobalComponents/FotoAction";

const useStyles = makeStyles((theme) => ({
  fab: {
    boxShadow: "none",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  socialIcons: {
    "& a": {
      fontSize: 32,
      marginLeft: "5px",
      marginRight: "5px",
      "&:first-child": {
        marginLeft: 0,
      },
      "&:last-child": {
        marginRight: 0,
      },
    },
  },
}));

function ProfileDetail({ profile, isUser, handleDeleteClick }) {
  const classes = useStyles();
  let url, queryKey;

  if (isUser) {
    url = `/api/simpeg/${profile.id}/alamat`;
    queryKey = ["user", profile.id, "alamat"];
  } else {
    url = `/api/profile/alamat`;
    queryKey = ["profile", "alamat"];
  }

  const {
    data: alamat,
    isError,
    isLoading,
  } = useQuery({
    queryKey: queryKey,
    queryFn: ({ signal }) =>
      axios
        .get(url, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  if (!profile) return null;

  return (
    <div className="">
      <Box className="user-detail" sx={{ pb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {!isUser && <FotoAction profile={profile} />}
          <div className="user-avatar">
            <Thumb file={profile.foto_admin} alt={profile.nama_admin} />
          </div>
        </Box>
        <Typography variant="h6" style={{ marginBottom: "5px" }}>
          {profile.verifikator ? (
            <Tooltip title="Verifikator Data Pegawai">
              <KeyOutlinedIcon color="primary" />
            </Tooltip>
          ) : null}
          {profile.nama_admin}
        </Typography>
        <Box mb={2} fontSize="subtitle2.fontSize" color="text.secondary">
          {profile.nama_level}
        </Box>
        {isUser ? (
          <>
            {profile.myself ? (
              <Fab
                className={classes.fab}
                size="small"
                aria-label="detail"
                component={Link}
                href={`/admin/profile`}
              >
                <VisibilityOutlinedIcon />
              </Fab>
            ) : (
              <Fab
                className={classes.fab}
                size="small"
                aria-label="detail"
                component={Link}
                href={`/admin/simpeg/${profile.id}`}
              >
                <VisibilityOutlinedIcon />
              </Fab>
            )}

            {!profile.myself && profile.editable && (
              <>
                <Fab
                  className={classes.fab}
                  size="small"
                  aria-label="Edit"
                  component={Link}
                  href={`/admin/simpeg/${profile.id}/edit`}
                >
                  <EditOutlinedIcon />
                </Fab>
                <Fab
                  className={classes.fab}
                  size="small"
                  aria-label="delete"
                  onClick={handleDeleteClick}
                >
                  <DeleteOutlineOutlinedIcon />
                </Fab>
              </>
            )}
          </>
        ) : null}
        <Fab
          className={classes.fab}
          size="small"
          aria-label="email"
          component={Link}
          href={`tel:${profile.telp_admin}`}
        >
          <LocalPhoneOutlinedIcon />
        </Fab>
        <Fab
          className={classes.fab}
          size="small"
          aria-label="email"
          component={Link}
          href={`mailto:${profile.email_admin}`}
        >
          <EmailOutlinedIcon />
        </Fab>
      </Box>
      <Divider />
      <div>
        <Box py={2}>
          <Box mb={2} fontSize="subtitle1.fontSize">
            Informasi Utama
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2">Email</Typography>
            <Typography variant="subtitle2" color="textPrimary">
              {profile.email_admin || "-"}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2">Phone No.</Typography>
            <Typography variant="subtitle2" color="textPrimary">
              {profile.telp_admin || "-"}
            </Typography>
          </Box>
          {!isUser && (
            <Box>
              <Typography variant="subtitle2">Update Terakhir</Typography>
              <Typography variant="subtitle2" color="textPrimary">
                {profile.updated_at
                  ? formatedDate(profile.updated_at, true)
                  : "-"}
              </Typography>
            </Box>
          )}
        </Box>
        <Divider />
        <Box display="flex" py={2} justifyContent="space-between">
          {isLoading && <Wait loading={true} minHeight={100} />}
          {isError && "An error has occurred"}
          {alamat ? (
            <Typography align="center">
              {alamat.alamat} RT {alamat.rt || "-"} RW {alamat.rw || "-"},
              Kel/Desa. {alamat.kelurahan || "-"}, Kec.{" "}
              {alamat.kecamatan || "-"}, {alamat.kabkota} {alamat.provinsi}
            </Typography>
          ) : null}
        </Box>
        <Divider />
        <Box className={classes.socialIcons} py={3} textAlign="center">
          <SocialIcons />
        </Box>
        <Divider />
      </div>
    </div>
  );
}

export default ProfileDetail;
