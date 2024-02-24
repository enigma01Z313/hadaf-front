import React, { useEffect, useState } from "react";

import { TextField } from "@mui/material";

import styles from "./style.module.css";

export default function ColInfo({
  activeOrder,
  amountId,
  description,
  handleDescriptionUpdate,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(description);
  }, [activeOrder]);

  return (
    <div className={`d-flex p-3 ${styles["col-info"]}`}>
      <TextField
        className="ml-2"
        style={{ width: "180px" }}
        value={value}
        multiline={true}
        rows={5}
        placeholder="توضیحات..."
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => handleDescriptionUpdate(value, amountId, activeOrder)}
      />
      <div className="grow-1">aaa</div>
    </div>
  );
}
