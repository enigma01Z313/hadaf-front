import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import Devider from "@/app/components/Devider";
import styles from "./style.module.css";

export default function TimeFrameItem({ timeframe, setSingle }) {
  return (
    <article
      className={`wrapper-box grow-1 mb-2 cursor-pointer
        ${styles["timeframe-item"]}`}
      onClick={() => setSingle(timeframe.id)}>
      <p className="text-h6 weight-500">{timeframe.title}</p>
      <Devider line={true} spacing={1} />
      <p>{timeframe.description}</p>
      <Devider line={true} spacing={1} />
      <div className="d-flex align-center">
        {new Date(timeframe.startDate).toLocaleDateString("fa-IR")}{" "}
        <KeyboardBackspaceIcon className="mx-0-5" style={{width: "20px"}} />
        {new Date(timeframe.endDate).toLocaleDateString("fa-IR")}
      </div>
    </article>
  );
}
