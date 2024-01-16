import React from "react";

import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ContainedInheritText from "@/app/components/Button/ContainedInheritText";

export default function Header({ viewMode, setViewMode }) {
  return (
    <div className="d-flex justify-between mb-1">
      <div></div>
      <div className="d-flex align-center">
        <span className="ml-1">حالت نمایش</span>
        <ContainedInheritText
          className={`ml-1 p-1`}
          active={viewMode === "column"}
          onClick={() => setViewMode("column")}>
          <ViewColumnIcon />
        </ContainedInheritText>
        <ContainedInheritText
          className={`p-1`}
          active={viewMode === "row"}
          onClick={() => setViewMode("row")}>
          <TableRowsIcon />
        </ContainedInheritText>
      </div>
    </div>
  );
}
