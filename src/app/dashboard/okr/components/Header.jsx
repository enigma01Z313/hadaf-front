import React, { useState, useEffect } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import AddIcon from "@mui/icons-material/Add";

export default function Header({
  timeframes,
  searchTerm,
  setSearchTerm,
  activeTimeframe,
  setActiveTimeframe,
  setSingleOkr,
}) {
  const handleChange = (e) => setActiveTimeframe(e.target.value);

  return (
    <div className={`d-flex mb-2 align-center`}>
      <TextField
        className="w-xxxxs-100"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="standard"
        placeholder="جستجو..."
      />
      <div className="mr-4 d-flex align-center mr-xxxs-0">
        <div>بازه زمانی: </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          {timeframes && timeframes.length !== 0 && (
            <Select
              id="timeframe-select"
              value={activeTimeframe}
              onChange={handleChange}
            >
              {timeframes.map((timeframe) => (
                <MenuItem key={timeframe.id} value={timeframe.id}>
                  {timeframe.title}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </div>
      <ContainedPrimary
        className={"mr-auto p-xs-0-5"}
        onClick={() => setSingleOkr("create")}
      >
        <AddIcon className="d-none d-xs-block" />

        <span className="d-xs-none">افزودن هدف</span>
      </ContainedPrimary>
    </div>
  );
}
