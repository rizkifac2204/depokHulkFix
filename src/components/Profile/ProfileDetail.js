import { makeStyles } from "@mui/styles";
import { Typography, Fab, Box, Divider } from "@mui/material";
import Image from "next/image";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

//component
import { SocialIcons } from "components/GlobalComponents/SocialIcons";

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

function ProfileDetail() {
  const classes = useStyles();
  return (
    <div className="">
      <Box py={3} className="user-detail">
        <div className="user-avatar">
          <Image
            src={"/Images/avatars/user-4.jpg"}
            alt="user images"
            width={300}
            height={300}
            priority
          />
        </div>
        <Typography variant="h6" style={{ marginBottom: "5px" }}>
          Nama Profile
        </Typography>
        <Box mb={2} fontSize="subtitle2.fontSize" color="text.secondary">
          Level Profile
        </Box>
        <Fab className={classes.fab} size="small" aria-label="phone">
          <LocalPhoneOutlinedIcon />
        </Fab>
        <Fab className={classes.fab} size="small" aria-label="email">
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
            <Typography variant="subtitle2">Email Address</Typography>
            <Typography variant="subtitle2" color="textPrimary">
              ethen@example.com
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2">Phone No.</Typography>
            <Typography variant="subtitle2" color="textPrimary">
              +01 234 567 8910
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Address</Typography>
            <Typography variant="subtitle2" color="textPrimary">
              3420, Pataya Street, Singapure
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          display="flex"
          py={2}
          px={{ xs: 0, md: "12px" }}
          justifyContent="space-between"
        >
          <Box textAlign="center">
            <Typography variant="subtitle2">Followers</Typography>
            <Typography variant="body2" color="textPrimary">
              1,238
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="subtitle2">Following</Typography>
            <Typography variant="body2" color="textPrimary">
              1,008
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="subtitle2">Posts</Typography>
            <Typography variant="body2" color="textPrimary">
              638
            </Typography>
          </Box>
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
