import React, { useEffect, useState } from "react";

import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

export default function ValidDays({ value: days, changeHandlred }) {
  const handleChange = (name) => {
    const newDays = days.map((day) => ({
      ...day,
      status: day.name === name ? !day.status : day.status,
    }));

    changeHandlred("validDays", newDays);
  };

  return (
    <div className="d-flex">
      {days.map((day, i) => (
        <FormControlLabel
          key={i}
          control={<Checkbox checked={day.status} />}
          label={day.name}
          onChange={() => handleChange(day.name)}
        />
      ))}
    </div>
  );
}
