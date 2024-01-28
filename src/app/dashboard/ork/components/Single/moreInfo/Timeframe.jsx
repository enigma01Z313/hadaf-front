import React, { useContext } from "react";

import { FormControl, Select, MenuItem } from "@mui/material";
import workspaceContext from "@/app/context/workspaceContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function Timeframe({ value, changeHandlred }) {
  const { theWorkspaceTimeframes } = useContext(workspaceContext);

  return (
    <div className="ml-2 grow-1">
      <FormControl
        id="okr-wrap-timeframe"
        fullWidth
        variant="standard"
        className="rtl-input p-relative w-100">
        <Select
          id="ork-timeframe"
          value={value}
          label=""
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
