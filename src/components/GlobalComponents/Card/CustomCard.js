import { Card, CardContent, Typography, Divider } from "@mui/material";

function CustomCard({
  children,
  cardClasses,
  title = null,
  showDivider = false,
}) {
  return (
    <Card
      sx={{
        p: "1.25rem",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        borderRadius: "0.625rem",
      }}
      className={`${cardClasses ? cardClasses : ""}`}
    >
      {title ? <Typography variant="h6">{title}</Typography> : null}
      {showDivider ? <Divider /> : null}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default CustomCard;
