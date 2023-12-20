import React, { useState } from "react";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import fullScreenTrigger from "@/app/utils/fullScreenTrigger";

export default function FullpageTrigger({ className, ...rest }) {
  const [fullScreen, setFullScreen] = useState(false);

  const classes = className ? `${className} d-flex align-center` : "";

  const handleFullScreen = () => {
    setFullScreen((state) => {
      if (!fullScreen) fullScreenTrigger.open();
      else fullScreenTrigger.close();

      return !state
    })
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handleFullScreen}
      className={classes}
      {...rest}>
      {(fullScreen && <FullscreenExitIcon style={{ fontSize: "40px" }} />) || (
        <FullscreenIcon style={{ fontSize: "40px" }} />
      )}
    </div>
  );
}
