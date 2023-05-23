import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import BackspaceIcon from "@mui/icons-material/Backspace";

import { getTime } from "utils/formatDate";

function truncateString(str, num = 100) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function NoteCard({ item, handleDelete, toggleShare, handleCopy, handleOpen }) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="flex-end">
          <Typography variant="caption" color="text.secondary" gutterBottom>
            {getTime(item.created_at)}
          </Typography>
        </Box>

        <Typography gutterBottom variant="h5" component="div">
          {item.judul || "-"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncateString(item.catatan)}
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <Typography variant="caption" gutterBottom>
          {item.nama_admin} - {item.nama_bawaslu}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ py: 0 }}>
        {item.editable === undefined ? (
          <>
            <Tooltip title="Hapus">
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(item.id)}
              >
                <DeleteForeverOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                Boolean(item.share) ? "Batal Bagikan" : "Bagikan Ke Publik"
              }
            >
              <IconButton aria-label="share" onClick={() => toggleShare(item)}>
                <ShareOutlinedIcon
                  fontSize="small"
                  color={Boolean(item.share) ? "secondary" : ""}
                />
              </IconButton>
            </Tooltip>
          </>
        ) : item.editable ? (
          <>
            <Tooltip title="Hapus">
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(item.id)}
              >
                <DeleteForeverOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Batal Bagikan">
              <IconButton aria-label="share" onClick={() => toggleShare(item)}>
                <BackspaceIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        ) : null}

        {Boolean(item.share) && (
          <Tooltip title="Salin Link">
            <IconButton
              aria-label="copy link"
              onClick={() => handleCopy(item.id)}
            >
              <ContentCopyOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Lihat">
          <IconButton
            aria-label="detail"
            sx={{ marginLeft: "auto" }}
            onClick={() => handleOpen(item)}
          >
            <ZoomInOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default NoteCard;
