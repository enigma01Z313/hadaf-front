import React, { useEffect, useState } from "react";

import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const defDays = [
  { code: 1, name: "شنبه", status: true },
  { code: 2, name: "یک شنبه", status: true },
  { code: 3, name: "دو شنبه", status: true },
  { code: 4, name: "سه شنبه", status: true },
  { code: 5, name: "چهار شنبه", status: true },
  { code: 6, name: "پنج شنبه", status: true },
  { code: 7, name: "جمعه", status: true },
];

export default function ValidDays({ value: days, changeHandlred }) {
  const handleChange = (code) => {
    let daysCp = [...days];
    const targetIndex = daysCp.findIndex((item) => item === code);

    if (targetIndex === -1) daysCp.push(code);
    else daysCp = daysCp.filter((item) => item !== code);

    changeHandlred("validDays", daysCp);
  };

console.log(days);

  return (
    <div className="d-flex">
      {defDays.map((day, i) => (
        <React.Fragment key={i}>
          <FormControlLabel
            control={<Checkbox checked={days.includes(day.code)} />}
            label={day.name}
            onChange={() => handleChange(day.code)}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
