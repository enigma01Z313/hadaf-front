import React, { useState, useEffect, useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TexedInherit from "@/app/components/Button/TexedInherit";
import IOSSlider from "@/app/components/Shared/I|OSSlider";

import styles from "./style.module.css";

export default function Progress({
  progress,
  className,
  handleProgressChange,
}) {
  const [isEditting, setIsEditting] = useState(false);

  const handleCommit = (e) => handleProgressChange(+e.target.innerText);

  return (
    <div className={styles["task-config"]}>
      <div
        onClick={() => setIsEditting(true)}
        className={`${className} wrapper-box2 cursor-pointer`}>
        درصد پیشرفت: {progress}٪
      </div>
      {isEditting && (
        <>
          <div
            className={styles["fixed-overlay"]}
            onClick={() => {
              setIsEditting(false);
            }}></div>
          <article className={`wrapper-box pt-5 ${styles["config-box"]}`}>
            <TexedInherit
              onClick={() => setIsEditting(false)}
              className={`p-1 ${styles["close-config"]}`}>
              <CloseIcon style={{ fontSize: "18px" }} />
            </TexedInherit>
            <Box sx={{ width: "100%" }}>
              <IOSSlider
                aria-label="ios slider"
                defaultValue={progress}
                valueLabelDisplay="on"
                onChangeCommitted={handleCommit}
              />
              <Box sx={{ m: 1 }} />
            </Box>
          </article>
        </>
      )}
    </div>
  );
}
