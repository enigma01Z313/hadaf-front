import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Devider from "@/app/components/Devider";
import styles from "./style.module.css";
import updateTimeframe from "@/app/lib/timeframes/update";

export default function TimeFrameItem({
  timeframe,
  setSingle,
  setLoading,
  setReloadList,
}) {
  const [hovered, setHovered] = useState(false);

  const handleBoxClick = async (e) => {
    e.stopPropagation();

    setLoading(true);
    await updateTimeframe(
      timeframe.id,
      { status: timeframe.status.code === 1 ? 0 : 1 },
      timeframe.workspace.id
    );
    setReloadList((state) => !state);
    setLoading(false);
  };

  return (
    <article
      className={`wrapper-box grow-1 mb-2 cursor-pointer
        ${styles["timeframe-item"]}`}
      onClick={() => setSingle(timeframe.id)}>
      <p className="text-h6 weight-500 d-flex justify-between">
        {timeframe.title}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
          {(timeframe.status.code === 1 && (
            <>
              {(hovered && (
                <a title="غیر فعال کردن">
                  <VisibilityOffIcon onClick={handleBoxClick} />
                </a>
              )) || <RemoveRedEyeIcon />}
            </>
          )) ||
            (timeframe.status.code === 0 && (
              <>
                {(hovered && (
                  <a title="فعال کردن">
                    <RemoveRedEyeIcon onClick={handleBoxClick} />
                  </a>
                )) || <VisibilityOffIcon />}
              </>
            ))}
        </div>
      </p>
      <Devider line={true} spacing={1} />
      <p>{timeframe.description}</p>
      <Devider line={true} spacing={1} />
      <div className="d-flex align-center">
        {new Date(timeframe.startDate).toLocaleDateString("fa-IR")}{" "}
        <KeyboardBackspaceIcon className="mx-0-5" style={{ width: "20px" }} />
        {new Date(timeframe.endDate).toLocaleDateString("fa-IR")}
      </div>
    </article>
  );
}
