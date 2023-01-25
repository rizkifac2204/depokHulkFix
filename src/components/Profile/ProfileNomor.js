import { Typography, Box } from "@mui/material";
// component
import CustomCard from "components/GlobalComponents/Card/CustomCard";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

function ProfileNomor() {
  return (
    <div>
      <CustomCard title={`Nomor-nomor`} showDivider={true}>
        {[1, 2, 3, 4, 5].map((item, idx) => (
          <Box
            key={idx}
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            <Item>Nomor {item}</Item>
            <Item>
              <Typography variant="subtitle2" align="right">
                0909 - 0909 - 09090909
              </Typography>
            </Item>
          </Box>
        ))}
      </CustomCard>
    </div>
  );
}

export default ProfileNomor;
