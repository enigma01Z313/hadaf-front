import React from "react";

import { MenuItem, FormControl, Select } from "@mui/material";

export default function Header({
  activeTimeframe,
  timeframes,
  setActiveTimeframe,
}) {
  const handleChange = (e) => setActiveTimeframe(e.target.value);

  return (
    <div className={`d-flex mb-2 align-center`}>
      <div className="mr-4">بازه زمانی: </div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        {timeframes && timeframes.length !== 0 && (
          <Select
            id="timeframe-select"
            value={activeTimeframe}
            onChange={handleChange}>
            {timeframes.map((timeframe) => (
              <MenuItem key={timeframe.id} value={timeframe.id}>
                {timeframe.title}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </div>
  );
}
