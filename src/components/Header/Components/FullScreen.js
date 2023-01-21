import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

function FullScreen(props) {
  const { handleFullScreen, iconColor } = props;
  if (!handleFullScreen.active) {
    return (
      <Tooltip title="Full Screen" placement="bottom">
        <IconButton
          aria-label="settings"
          style={{ padding: "6px" }}
          onClick={handleFullScreen.enter}
        >
          <FullscreenIcon className={iconColor} />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Exit Full Screen" placement="bottom">
      <IconButton
        aria-label="settings"
        style={{ padding: "6px" }}
        onClick={handleFullScreen.exit}
      >
        <FullscreenExitIcon className={iconColor} />
      </IconButton>
    </Tooltip>
  );
}

export default FullScreen;
