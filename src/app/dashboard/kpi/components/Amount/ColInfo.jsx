import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

import Item from "./Item";
import styles from "./style.module.css";

import getAmountLogs from "@/app/lib/kpi/amounts/logs/list";

export default function ColInfo({
  activeOrder,
  amountId,
  description,
  handleDescriptionUpdate,
}) {
  const [value, setValue] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setValue(description);

    (async function () {
      if (amountId && amountId !== -1) {
        const amountLog = await getAmountLogs(amountId);

        setLogs(amountLog);
      }
    })();
  }, [activeOrder]);

  return (
    <div className={`d-flex p-3 no-wrap ${styles["col-info"]}`}>
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
      <div className="grow-1">
        <PerfectScrollbar style={{ maxHeight: "170px" }}>
          <div>
            {(logs.length === 0 && "چیزی برای نمایش وجود ندارد") ||
              logs?.map?.((log, index) => (
                <Item key={index} log={log} index={index} />
              ))}
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
}
