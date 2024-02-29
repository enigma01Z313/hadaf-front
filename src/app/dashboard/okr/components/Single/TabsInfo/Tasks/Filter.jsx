import React from "react";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

export default function Filter({
  taskStasuses,
  statusFilter,
  setStatusFilter,
}) {
  const statuses = Object.values(taskStasuses)
  statuses.pop()

  return (
    <div>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <FormControlLabel value="all" control={<Radio />} label="همه" />
          {statuses.map((taskStatus) => (
            <FormControlLabel
              key={taskStatus.id}
              value={taskStatus.id}
              control={<Radio />}
              label={taskStatus.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
