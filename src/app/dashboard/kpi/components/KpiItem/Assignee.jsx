import React from "react";

export default function Assignee({ assignee }) {
  return <>{assignee?.fullName ?? `تیم ${assignee?.name}` ?? ""}</>;
}
