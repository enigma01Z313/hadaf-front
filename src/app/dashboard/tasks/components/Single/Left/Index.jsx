import React from "react";

import Assignee from "./Assignee";
import Progress from "./Progress";
import Colleages from "./Colleages";

export default function Left({ assignee, progress, colleages }) {
  return (
    <aside className={`grow-1`} style={{ maxWidth: "25%" }}>
      <Assignee assignee={assignee} className="mb-1" />
      <Progress progress={progress} className="mb-1" />
      <Colleages colleages={colleages} />
    </aside>
  );
}
