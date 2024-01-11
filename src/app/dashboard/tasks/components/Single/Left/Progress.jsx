import React, { useState, useEffect, useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Slider, { SliderThumb } from "@mui/material/Slider";
import TexedInherit from "@/app/components/Button/TexedInherit";
import { styled } from "@mui/material/styles";

import styles from "./style.module.css";

export default function Progress({
  progress,
  className,
  handleProgressChange,
}) {
  const [isEditting, setIsEditting] = useState(false);

  const iOSBoxShadow =
    "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

  const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? "#0a84ff" : "#007bff",
    height: 5,
    padding: "15px 0",
    "& .MuiSlider-thumb": {
      height: 20,
      width: 20,
      backgroundColor: "#fff",
      boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
      "&:focus, &:hover, &.Mui-active": {
        boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          boxShadow: iOSBoxShadow,
        },
      },
      "&:before": {
        boxShadow:
          "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)",
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      fontWeight: "normal",
      top: -6,
      backgroundColor: "unset",
      color: theme.palette.text.primary,
      "&::before": {
        display: "none",
      },
      "& *": {
        background: "transparent",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      },
    },
    "& .MuiSlider-track": {
      border: "none",
      height: 5,
    },
    "& .MuiSlider-rail": {
      opacity: 0.5,
      boxShadow: "inset 0px 0px 4px -2px #000",
      backgroundColor: "#d0d0d0",
    },
  }));

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
                // value={progress}
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
