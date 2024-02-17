import React, { useContext, useEffect } from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import workspaceContext from "@/app/context/workspaceContext";

export default function ParentOkr({ changeHandlred, value }) {
  const { theWorkspaceOkrs } = useContext(workspaceContext);

  const label = "هدف والد";

  return (
    <div className="grow-1 ml-2">
      <FormControl
        id="okr-wrap-parent-okr"
        variant="standard"
        className="rtl-input w-100">
        <InputLabel id="okr-parent-okr-select-label">{label}</InputLabel>
        <Select
          labelId="okr-parent-okr-select-label"
          id={`okr-parent-okr-select`}
          value={value ?? theWorkspaceOkrs?.data?.[0]?.id ?? ""}
          onChange={(e) => changeHandlred("targetParent", e.target.value)}
          className="text-h6 py-1">
          {theWorkspaceOkrs?.data &&
            theWorkspaceOkrs?.data?.map((okr) => (
              <MenuItem key={okr.id} value={okr.id}>
                {okr.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
