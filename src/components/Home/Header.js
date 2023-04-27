import Link from "next/link";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useAuthContext } from "context/AuthContext";

function HomeHeader(props) {
  const { user } = useAuthContext();
  const { title } = props;

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        {user ? (
          <Button
            variant="outlined"
            size="small"
            component={Link}
            href="/admin"
          >
            {`Dashboard ${user.name}`}
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="small"
            component={Link}
            href="/login"
          >
            Log In
          </Button>
        )}
      </Toolbar>
      <Divider sx={{ mb: 2 }} />
    </>
  );
}

HomeHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HomeHeader;
