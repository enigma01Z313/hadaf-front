import React, { useEffect, useState, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

import listTimeframes from "@/app/lib/timeframes/list";

export default function Timeframe() {
  const { theWorkspace } = useContext(workspaceContext);
  const [timeframes, setTimeframes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      console.log("0----------------------");
      console.log(theWorkspace);

      const timeframesList = theWorkspace
        ? await listTimeframes(theWorkspace)
        : [];

      console.log("2----------------------");
      console.log(timeframesList);
      //   setTimeframes(timeframesList);
    })();
  }, [theWorkspace]);

  return (
    <section className={loading ? "loading" : ""}>
      <header className="d-flex justify-between">
        <h3 className="text-h6 mb-2">بازه های زمانی</h3>
        <ContainedPrimary>افزودن</ContainedPrimary>
      </header>
    </section>
  );
}
