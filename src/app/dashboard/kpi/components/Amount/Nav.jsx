import React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ContainedInheritText from "@/app/components/Button/ContainedInheritText";

export default function Nav({ setPatchIndex, isPrevNavDisable }) {
  return (
    <div className="d-flex justify-between mb-2">
      <ContainedInheritText
        disabled={isPrevNavDisable()}
        className="no-shadow radius-circle p-1"
        onClick={() => setPatchIndex((state) => state - 1)}>
        <ChevronRightIcon />
      </ContainedInheritText>
      <ContainedInheritText
        className="no-shadow radius-circle p-1"
        onClick={() => setPatchIndex((state) => state + 1)}>
        <ChevronLeftIcon />
      </ContainedInheritText>
    </div>
  );
}
