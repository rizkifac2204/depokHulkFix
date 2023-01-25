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

function ProfileBadan() {
  return (
    <div>
      <CustomCard title={`Keterangan Badan`} showDivider={true}>
        {[1, 2, 3, 4, 5].map((item, idx) => (
          <Box
            key={idx}
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            <Item>Tinggi {item}</Item>
            <Item>
              <Typography variant="subtitle2" align="right">
                12 cm
              </Typography>
            </Item>
          </Box>
        ))}
      </CustomCard>
    </div>
  );
}

export default ProfileBadan;
