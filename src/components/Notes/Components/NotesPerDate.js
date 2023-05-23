import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { formatedDate } from "utils/formatDate";
import NoteCard from "./NoteCard";

function NotesPerDate({
  data,
  handleDelete,
  toggleShare,
  handleCopy,
  handleOpen,
}) {
  return (
    <Box mb={5}>
      <Box mb={2}>
        <Typography gutterBottom variant="h4" component="div" color={"primary"}>
          {formatedDate(data.date, true)}
        </Typography>
        <Divider />
      </Box>
      <Grid container spacing={3}>
        {data.notes.map((item, idx) => (
          <Grid item xs={12} sm={4} md={3} key={idx}>
            <NoteCard
              item={item}
              handleDelete={handleDelete}
              toggleShare={toggleShare}
              handleCopy={handleCopy}
              handleOpen={handleOpen}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default NotesPerDate;
