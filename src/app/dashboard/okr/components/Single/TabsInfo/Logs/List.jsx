import React, { useState, useEffect, useContext } from "react";

import Item from "./Item";

import getOkrLogs from "@/app/lib/okr/logs/list";

export default function List({ okrId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    (async function () {
      const logsList = await getOkrLogs(okrId);
      setLogs(logsList);
    })();
  }, []);

  return (
    <div>
      {(logs.length === 0 && "چیزی برای نمایش وجود ندارد") ||
        logs?.map?.((log, index) => (
          <Item key={index} log={log} index={index} />
        ))}
    </div>
  );
}
