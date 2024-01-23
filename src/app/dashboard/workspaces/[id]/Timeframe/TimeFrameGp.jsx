import React from "react";

import TimeFrameItem from "./TimeFrameItem";
import Devider from "@/app/components/Devider";

import styles from "./style.module.css";

export default function TimeFrameGp({
  timeframeGp,
  setSingle,
  setLoading,
  setReloadList,
}) {
  return (
    <div>
      <h4 className="text-h6 weight-400">{timeframeGp.label}</h4>
      <Devider line={true} spacing={1} />

      <div className={`d-flex ${styles["timeframes-wrapper"]}`}>
        {timeframeGp.items.map((timeframe) => (
          <TimeFrameItem
            key={timeframe.id}
            timeframe={timeframe}
            setSingle={setSingle}
            setLoading={setLoading}
            setReloadList={setReloadList}
          />
        ))}
      </div>
    </div>
  );
}
