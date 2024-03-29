import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

export default function Header({
  timeframes,
  searchTerm,
  setSearchTerm,
  activeTimeframe,
  setActiveTimeframe,
  setSingleKpi,
  setKpiStatus,
}) {
  const handleChange = (e) => setActiveTimeframe(e.target.value);

  return (
    <div className={`d-flex mb-2 align-center`}>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="standard"
        placeholder="جستجو..."
      />
      <div>
        <FormControlLabel
          onChange={(e) => {
            if (!e.target.checked) setKpiStatus(1);
            else setKpiStatus(0);
          }}
          control={<Checkbox />}
          label="آرشیو شده"
        />
      </div>
      {/* <div className="mr-4">بازه زمانی: </div>
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
      </FormControl> */}
      <ContainedPrimary
        className={"mr-auto"}
        onClick={() => setSingleKpi("create")}
      >
        افزودن KPI
      </ContainedPrimary>
    </div>
  );
}
