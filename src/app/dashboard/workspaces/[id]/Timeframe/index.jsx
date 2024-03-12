import React, { useEffect, useState, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

import listTimeframes from "@/app/lib/timeframes/list";
import Single from "./Single";
import TimeFrameGp from "./TimeFrameGp";

export default function Timeframe() {
  const { theWorkspace } = useContext(workspaceContext);
  const [timeframes, setTimeframes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [single, setSingle] = useState("");
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    (async function () {
      const timeframesList = theWorkspace
        ? await listTimeframes({ workspaceId: theWorkspace, all: true })
        : [];

      setTimeframes(timeframesList);
      setLoading(false);
    })();
  }, [reloadList, theWorkspace]);

  return (
    <>
      <section className={loading ? "loading" : ""}>
        <header className="d-flex justify-between align-center mb-1">
          <h3 className="text-h6">بازه های زمانی</h3>
          <ContainedPrimary onClick={() => setSingle("create")}>
            ایجاد بازه زمانی جدید
          </ContainedPrimary>
        </header>

        {timeframes.map((v, i) => (
          <TimeFrameGp
            key={i}
            timeframeGp={v}
            setSingle={setSingle}
            setLoading={setLoading}
            setReloadList={setReloadList}
          />
        ))}
      </section>
      {single !== "" && (
        <Single
          single={single}
          setSingle={setSingle}
          setReloadList={setReloadList}
          theWorkspace={theWorkspace}
        />
      )}
    </>
  );
}
