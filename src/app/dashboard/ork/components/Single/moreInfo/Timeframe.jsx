import React, { useContext } from "react";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import workspaceContext from "@/app/context/workspaceContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function Timeframe({ value, changeHandlred }) {
  const { theWorkspaceTimeframes } = useContext(workspaceContext);

  const label = "بازه زمانی";

  return (
    <div className="ml-2 grow-1">
      <FormControl
        id="okr-wrap-timeframe"
        fullWidth
        variant="standard"
        className="rtl-input p-relative w-100">
        <InputLabel id="okr-timeframe-select-label">{label}</InputLabel>
        <Select
          id="ork-timeframe"
          value={value}
          onChange={(e) => changeHandlred("timeFrame", e.target.value)}
          className="text-h6 py-1">
          {theWorkspaceTimeframes.map((item) => (
            <MenuItem
              className="d-flex align-center"
              key={item.id}
              value={item.id}>
              {item.title} (
              {new Date(item.startDate).toLocaleDateString("fa-IR")}
              <KeyboardBackspaceIcon
                className="mx-0-5"
                style={{ width: "20px" }}
              />
              {new Date(item.endDate).toLocaleDateString("fa-IR")})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
